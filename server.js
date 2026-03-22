const express = require('express');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const articleRoutes = require('./routes/article.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Swagger config
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Blog API - INF222 TAF1',
      version: '1.0.0',
      description: 'API REST pour la gestion d\'un blog simple'
    },
    servers: [{ url: `http://localhost:${PORT}` }]
  },
  apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/articles', articleRoutes);

// Route d'accueil
app.get('/', (req, res) => {
  res.json({
    message: 'Blog API - INF222 TAF1',
    docs: `http://localhost:${PORT}/api-docs`,
    endpoints: {
      'POST   /api/articles':              'Créer un article',
      'GET    /api/articles':              'Lister les articles',
      'GET    /api/articles/search?query': 'Rechercher',
      'GET    /api/articles/:id':          'Lire un article',
      'PUT    /api/articles/:id':          'Modifier un article',
      'DELETE /api/articles/:id':          'Supprimer un article'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route non trouvée.' });
});

app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
  console.log(`📄 Documentation Swagger : http://localhost:${PORT}/api-docs`);
});

module.exports = app;
