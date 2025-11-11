// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const createSwagger = (app) => {
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
          url: process.env.BASE_URL || "http://localhost:8080",
          description: "Server",
        },
      ],
    },
    apis: ['./routes/*.js'],
  };

  const swaggerSpec = swaggerJSDoc(options);

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.get('/swagger.json', (req, res) => {
    // Overwrite baseURL dynamically
    const host = req.get("host");
    const protocol = req.headers["x-forwarded-proto"] || req.protocol;

    swaggerSpec.servers = [
      {
        url: `${protocol}://${host}`,
      },
    ];

    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  console.log('✅ Swagger listo en /api-docs');
};

module.exports = createSwagger;
