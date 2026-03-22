# Blog API — INF222 TAF1

API REST pour la gestion d'un blog simple, développée avec Node.js, Express et SQLite.

## Installation

```bash
# Cloner le dépôt
git clone <url-du-repo>
cd blog-api

# Installer les dépendances
npm install

# Démarrer le serveur
npm start

# Mode développement (avec rechargement automatique)
npm run dev
```

Le serveur démarre sur `http://localhost:3000`  
Documentation Swagger : `http://localhost:3000/api-docs`

---

## Technologies utilisées

- **Runtime** : Node.js
- **Framework** : Express.js
- **Base de données** : SQLite (via better-sqlite3)
- **Documentation** : Swagger (swagger-jsdoc + swagger-ui-express)

---

## Structure du projet

```
blog-api/
├── server.js               # Point d'entrée
├── config/
│   └── database.js         # Connexion SQLite
├── models/
│   └── article.model.js    # Logique base de données
├── controllers/
│   └── article.controller.js # Logique métier
├── routes/
│   └── article.routes.js   # Définition des routes + Swagger
└── package.json
```

---

## Endpoints

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/articles` | Créer un article |
| GET | `/api/articles` | Lister tous les articles |
| GET | `/api/articles?categorie=Tech` | Filtrer par catégorie |
| GET | `/api/articles?auteur=Alice` | Filtrer par auteur |
| GET | `/api/articles/search?query=node` | Rechercher |
| GET | `/api/articles/:id` | Lire un article |
| PUT | `/api/articles/:id` | Modifier un article |
| DELETE | `/api/articles/:id` | Supprimer un article |

---

## Exemples d'utilisation

### Créer un article

```http
POST /api/articles
Content-Type: application/json

{
  "titre": "Introduction à Node.js",
  "contenu": "Node.js est un environnement d'exécution JavaScript...",
  "auteur": "Alice",
  "date": "2026-03-21",
  "categorie": "Technologie",
  "tags": ["node", "javascript", "backend"]
}
```

**Réponse (201) :**
```json
{
  "message": "Article créé avec succès.",
  "article": {
    "id": 1,
    "titre": "Introduction à Node.js",
    "auteur": "Alice",
    ...
  }
}
```

### Lister les articles

```http
GET /api/articles
```

### Filtrer par catégorie et date

```http
GET /api/articles?categorie=Technologie&date=2026-03-21
```

### Rechercher un article

```http
GET /api/articles/search?query=Node
```

### Modifier un article

```http
PUT /api/articles/1
Content-Type: application/json

{
  "titre": "Introduction à Node.js (mis à jour)",
  "tags": ["node", "js", "backend", "express"]
}
```

### Supprimer un article

```http
DELETE /api/articles/1
```

---

## Codes HTTP utilisés

| Code | Signification |
|------|---------------|
| 200 | OK — Requête réussie |
| 201 | Created — Article créé |
| 400 | Bad Request — Données invalides |
| 404 | Not Found — Article inexistant |
| 500 | Internal Server Error — Erreur serveur |

---

## Structure d'un article

```json
{
  "id": 1,
  "titre": "Mon article",
  "contenu": "Contenu de l'article",
  "auteur": "Alice",
  "date": "2026-03-21",
  "categorie": "Technologie",
  "tags": ["tag1", "tag2"],
  "created_at": "2026-03-21 10:00:00"
}
```
