// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const createSwagger = (app) => {
  const port = process.env.PORT || 8080;
  const baseUrl = process.env.BASE_URL || `http://localhost:${port}`;

  const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Contacts API',
        version: '1.0.0',
        description: 'API for managing contacts (CSE341 Project)',
      },
      servers: [
        {
          url: baseUrl,
          description: 'Local server',
        },
      ],
    },
    apis: ['./routes/*.js'],
  };

  const swaggerSpec = swaggerJSDoc(options);

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  console.log('✅ Swagger listo en /api-docs');
};

module.exports = createSwagger;
