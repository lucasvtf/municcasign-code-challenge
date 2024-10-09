import { Router } from 'express';
import DocumentController from '../controllers/documentController';

const documentRouter = Router();
const documentController = new DocumentController();


/**
 * @swagger
 * /docs/{userId}:
 *   get:
 *     tags: ["Documentos"]
 *     summary: "Buscar todos os documentos de um usuário"
 *     parameters:
 *       - name: "userId"
 *         in: "path"
 *         required: true
 *         schema:
 *           type: "integer"
 *           example: 1
 *     responses:
 *       200:
 *         description: "Documentos encontrados"
 *         content:
 *           application/json:
 *             schema:
 *               type: "array"
 *               items:
 *                 $ref: "#/components/schemas/Document"
 *             example:
 *               - id: 1
 *                 name: "Documento 1"
 *                 status: "ativo"
 *                 userId: 1
 *               - id: 2
 *                 name: "Documento 2"
 *                 status: "inativo"
 *                 userId: 1
 *       404:
 *         description: "Usuário não encontrado"
 *         content:
 *           application/json:
 *             example:
 *               message: "Usuário não encontrado."
 */

documentRouter.get('/docs/:userId', documentController.getAllDocuments.bind(documentController));

/**
 * @swagger
 * /docs/{userId}/{docId}:
 *   get:
 *     tags:
 *       - Documentos
 *     summary: "Buscar um documento específico por ID de usuário e ID de documento"
 *     parameters:
 *       - name: "userId"
 *         in: "path"
 *         required: true
 *         schema:
 *           type: "integer"
 *           example: 1
 *       - name: "docId"
 *         in: "path"
 *         required: true
 *         schema:
 *           type: "integer"
 *           example: 1
 *     responses:
 *       200:
 *         description: "Documento encontrado"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Document"
 *             example:
 *               id: 1
 *               name: "Documento 1"
 *               status: "ativo"
 *               userId: 1
 *       404:
 *         description: "Documento ou Usuário não encontrado"
 *         content:
 *           application/json:
 *             examples:
 *               documentNotFound:
 *                 value:
 *                   message: "Documento não encontrado."
 *               userNotFound:
 *                 value:
 *                   message: "Usuário não encontrado."
 */

documentRouter.get('/docs/:userId/:docId', documentController.getDocumentById.bind(documentController));

/**
 * @swagger
 * /docs/{userId}:
 *   post:
 *     tags:
 *       - Documentos
 *     summary: "Criar um novo documento vinculado a um usuário"
 *     parameters:
 *       - name: "userId"
 *         in: "path"
 *         required: true
 *         schema:
 *           type: "integer"
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: "object"
 *             properties:
 *               name:
 *                 type: "string"
 *                 example: "Documento 4"
 *               status:
 *                 type: "string"
 *                 example: "ativo"
 *     responses:
 *       201:
 *         description: "Documento criado com sucesso"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Document"
 *             example:
 *               name: "Documento 4"
 *               status: "ativo"
 *               userId: 1
 *       404:
 *         description: "Usuário não encontrado"
 *         content:
 *           application/json:
 *             example:
 *               message: "Usuário não encontrado"
 */

documentRouter.post('/docs/:userId', documentController.createDocument.bind(documentController));

/**
 * @swagger
 * /docs/{userId}/{docId}:
 *   put:
 *     tags:
 *       - Documentos
 *     summary: "Atualizar um documento vinculado a um usuário"
 *     parameters:
 *       - name: "userId"
 *         in: "path"
 *         required: true
 *         schema:
 *           type: "integer"
 *           example: 1
 *       - name: "docId"
 *         in: "path"
 *         required: true
 *         schema:
 *           type: "integer"
 *           example: 4
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: "object"
 *             properties:
 *               name:
 *                 type: "string"
 *                 example: "Documento 5"
 *               status:
 *                 type: "string"
 *                 example: "ativo"
 *     responses:
 *       200:
 *         description: "Documento atualizado com sucesso"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Document"
 *             example:
 *               id: 4
 *               name: "Documento 5"
 *               status: "ativo"
 *               userId: 1
 *       404:
 *         description: "Documento ou Usuário não encontrado"
 *         content:
 *           application/json:
 *             examples:
 *               documentNotFound:
 *                 value:
 *                   message: "Documento não encontrado."
 *               userNotFound:
 *                 value:
 *                   message: "Usuário não encontrado."
 */

documentRouter.put('/docs/:userId/:docId', documentController.updateDocument.bind(documentController));

/**
 * @swagger
 * /docs/{userId}/{docId}:
 *   delete:
 *     tags:
 *       - Documentos
 *     summary: "Remover um documento vinculado a um usuário"
 *     parameters:
 *       - name: "userId"
 *         in: "path"
 *         required: true
 *         schema:
 *           type: "integer"
 *           example: 1
 *       - name: "docId"
 *         in: "path"
 *         required: true
 *         schema:
 *           type: "integer"
 *           example: 4
 *     responses:
 *       204:
 *         description: "Documento removido com sucesso, sem conteúdo na resposta"
 *       403:
 *         description: "Proibido deletar o usuario não está associado ao documento"
 *       404:
 *         description: "Documento ou Usuário não encontrado"
 *         content:
 *           application/json:
 *             examples:
 *               documentNotFound:
 *                 value:
 *                   message: "Documento não encontrado."
 *               userNotFound:
 *                 value:
 *                   message: "Usuário não encontrado."
 */

documentRouter.delete('/docs/:userId/:docId', documentController.deleteDocument.bind(documentController));

export default documentRouter;
