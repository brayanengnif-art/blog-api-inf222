const { getDb, save } = require('../config/database');

const Article = {
  async create(data) {
    const db = await getDb();
    const { titre, contenu, auteur, date, categorie, tags } = data;
    db.run(
      `INSERT INTO articles (titre, contenu, auteur, date, categorie, tags) VALUES (?,?,?,?,?,?)`,
      [titre, contenu, auteur, date, categorie, JSON.stringify(tags || [])]
    );
    save();
    const result = db.exec(`SELECT * FROM articles ORDER BY rowid DESC LIMIT 1`);
    if (!result.length) return null;
    return rowToObj(result[0].columns, result[0].values[0]);

    
  },

  async findAll(filters = {}) {
    const db = await getDb();
    let query = 'SELECT * FROM articles WHERE 1=1';
    const params = [];
    if (filters.categorie) { query += ' AND categorie = ?'; params.push(filters.categorie); }
    if (filters.auteur)    { query += ' AND auteur = ?';    params.push(filters.auteur); }
    if (filters.date)      { query += ' AND date = ?';      params.push(filters.date); }
    query += ' ORDER BY created_at DESC';
    const result = db.exec(query, params);
    if (!result.length) return [];
    return result[0].values.map(row => rowToObj(result[0].columns, row));
  },

  async findById(id) {
    const db = await getDb();
    const result = db.exec('SELECT * FROM articles WHERE id = ?', [id]);
    if (!result.length) return null;
    return rowToObj(result[0].columns, result[0].values[0]);
  },

  async update(id, data) {
    const db = await getDb();
    const fields = [], params = [];
    if (data.titre     !== undefined) { fields.push('titre = ?');     params.push(data.titre); }
    if (data.contenu   !== undefined) { fields.push('contenu = ?');   params.push(data.contenu); }
    if (data.categorie !== undefined) { fields.push('categorie = ?'); params.push(data.categorie); }
    if (data.tags      !== undefined) { fields.push('tags = ?');      params.push(JSON.stringify(data.tags)); }
    if (fields.length === 0) return this.findById(id);
    params.push(id);
    db.run(`UPDATE articles SET ${fields.join(', ')} WHERE id = ?`, params);
    save();
    return this.findById(id);
  },

  async delete(id) {
    const db = await getDb();
    db.run('DELETE FROM articles WHERE id = ?', [id]);
    save();
    return true;
  },

  async search(query) {
    const db = await getDb();
    const result = db.exec(
      'SELECT * FROM articles WHERE titre LIKE ? OR contenu LIKE ? ORDER BY created_at DESC',
      [`%${query}%`, `%${query}%`]
    );
    if (!result.length) return [];
    return result[0].values.map(row => rowToObj(result[0].columns, row));
  }
};

function rowToObj(columns, row) {
  const obj = {};
  columns.forEach((col, i) => obj[col] = row[i]);
  obj.tags = JSON.parse(obj.tags || '[]');
  return obj;
}

module.exports = Article;