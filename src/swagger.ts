import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Document API',
      version: '1.0.0',
      description: 'API para gerenciar documentos vinculados a usuários',
    },
    components: {
        schemas: {
          User: {
            type: 'object',
            properties: {
              id: {
                type: 'integer',
                example: 1,
              },
              name: {
                type: 'string',
                example: 'Lucas Victor',
              },
              email: {
                type: 'string',
                example: 'lucas@example.com',
              },
            },
          },
          Document: {
            type: 'object',
            properties: {
              id: {
                type: 'integer',
                example: 1,
              },
              name: {
                type: 'string',
                example: 'Documento 1',
              },
              status: {
                type: 'string',
                example: 'ativo',
              },
              userId: {
                type: 'integer',
                example: 1,
              },
            },
          },
        },
      },
    },
  apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};


