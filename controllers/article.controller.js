const Article = require('../models/article.model');

const createArticle = async (req, res) => {
  try {
    const { titre, contenu, auteur, date, categorie, tags } = req.body;
    if (!titre?.trim())    return res.status(400).json({ error: 'Le titre est obligatoire.' });
    if (!auteur?.trim())   return res.status(400).json({ error: "L'auteur est obligatoire." });
    if (!contenu?.trim())  return res.status(400).json({ error: 'Le contenu est obligatoire.' });
    if (!categorie?.trim()) return res.status(400).json({ error: 'La catégorie est obligatoire.' });
    const article = await Article.create({
      titre: titre.trim(), contenu: contenu.trim(), auteur: auteur.trim(),
      date: date || new Date().toISOString().split('T')[0],
      categorie: categorie.trim(), tags: Array.isArray(tags) ? tags : []
    });
    return res.status(201).json({ message: 'Article créé avec succès.', article });
  } catch (err) { return res.status(500).json({ error: 'Erreur serveur.', details: err.message }); }
};

const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.findAll(req.query);
    return res.status(200).json({ articles, total: articles.length });
  } catch (err) { return res.status(500).json({ error: 'Erreur serveur.', details: err.message }); }
};

const searchArticles = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query?.trim()) return res.status(400).json({ error: 'Le paramètre query est requis.' });
    const articles = await Article.search(query.trim());
    return res.status(200).json({ articles, total: articles.length });
  } catch (err) { return res.status(500).json({ error: 'Erreur serveur.', details: err.message }); }
};

const getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ error: 'Article non trouvé.' });
    return res.status(200).json({ article });
  } catch (err) { return res.status(500).json({ error: 'Erreur serveur.', details: err.message }); }
};

const updateArticle = async (req, res) => {
  try {
    const existing = await Article.findById(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Article non trouvé.' });
    const updated = await Article.update(req.params.id, req.body);
    return res.status(200).json({ message: 'Article mis à jour.', article: updated });
  } catch (err) { return res.status(500).json({ error: 'Erreur serveur.', details: err.message }); }
};

const deleteArticle = async (req, res) => {
  try {
    const existing = await Article.findById(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Article non trouvé.' });
    await Article.delete(req.params.id);
    return res.status(200).json({ message: 'Article supprimé avec succès.' });
  } catch (err) { return res.status(500).json({ error: 'Erreur serveur.', details: err.message }); }
};

module.exports = { createArticle, getAllArticles, getArticleById, updateArticle, deleteArticle, searchArticles };