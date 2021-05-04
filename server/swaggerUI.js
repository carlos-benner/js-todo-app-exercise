const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'TODO API',
            version: '1.0.0',
            description: 'A simple express todo api',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['./routes/api/components/**/*.js'],
};

const swaggerSpecs = swaggerJsDoc(options);

module.exports = { swaggerUI, swaggerSpecs };
