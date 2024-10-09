import { Router } from 'express';
import UserController from '../controllers/userController';

const userRouter = Router();
const userController = new UserController();

/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - Usuários
 *     summary: "Obter todos os usuários"
 *     description: "Retorna uma lista de todos os usuários cadastrados"
 *     responses:
 *       200:
 *         description: "Lista de usuários retornada com sucesso"
 *         content:
 *           application/json:
 *             schema:
 *               type: "array"
 *               items:
 *                 type: "object"
 *                 properties:
 *                   id:
 *                     type: "integer"
 *                     example: 1
 *                   name:
 *                     type: "string"
 *                     example: "Lucas Victor"
 *                   email:
 *                     type: "string"
 *                     example: "lucas@example.com"
 */

userRouter.get('/users', userController.getAllUsers.bind(userController));

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     tags:
 *       - Usuários
 *     summary: "Obter usuário por ID"
 *     description: "Retorna os detalhes de um usuário específico com base no ID fornecido"
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: "ID do usuário que você deseja obter"
 *         schema:
 *           type: "integer"
 *           example: 1
 *     responses:
 *       200:
 *         description: "Usuário encontrado com sucesso"
 *         content:
 *           application/json:
 *             schema:
 *               type: "object"
 *               properties:
 *                 id:
 *                   type: "integer"
 *                   example: 1
 *                 name:
 *                   type: "string"
 *                   example: "Lucas Victor"
 *                 email:
 *                   type: "string"
 *                   example: "lucas@example.com"
 *       404:
 *         description: "Usuário não encontrado"
 *         content:
 *           application/json:
 *             schema:
 *               type: "object"
 *               properties:
 *                 message:
 *                   type: "string"
 *                   example: "Usuáro não encontrado"
 */

userRouter.get('/users/:userId', userController.getUserById.bind(userController));

/**
 * @swagger
 * /users:
 *   post:
 *     tags:
 *       - Usuários
 *     summary: "Criar um novo usuário"
 *     description: "Cria um novo usuário com as informações fornecidas"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: "object"
 *             properties:
 *               name:
 *                 type: "string"
 *                 example: "Teste"
 *               email:
 *                 type: "string"
 *                 format: "email"
 *                 example: "teste@teste.com"
 *     responses:
 *       201:
 *         description: "Usuário criado com sucesso"
 *         content:
 *           application/json:
 *             schema:
 *               type: "object"
 *               properties:
 *                 id:
 *                   type: "integer"
 *                   example: 3
 *                 name:
 *                   type: "string"
 *                   example: "Teste"
 *                 email:
 *                   type: "string"
 *                   example: "teste@teste.com"
 *       403:
 *         description: "Email já registrado"
 *         content:
 *           application/json:
 *             schema:
 *               type: "object"
 *               properties:
 *                 message:
 *                   type: "string"
 *                   example: "Email já registrado."
 */

userRouter.post('/users', userController.createUser.bind(userController));

/**
 * @swagger
 * /users/{userId}:
 *   put:
 *     tags:
 *       - Usuários
 *     summary: "Atualizar um usuário existente"
 *     description: "Atualiza as informações de um usuário existente com base no ID fornecido"
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: "ID do usuário a ser atualizado"
 *         schema:
 *           type: "integer"
 *           example: 3
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: "object"
 *             properties:
 *               name:
 *                 type: "string"
 *                 example: "Teste123"
 *               email:
 *                 type: "string"
 *                 format: "email"
 *                 example: "teste@teste.com"
 *     responses:
 *       200:
 *         description: "Usuário atualizado com sucesso"
 *         content:
 *           application/json:
 *             schema:
 *               type: "object"
 *               properties:
 *                 id:
 *                   type: "integer"
 *                   example: 3
 *                 name:
 *                   type: "string"
 *                   example: "Teste123"
 *                 email:
 *                   type: "string"
 *                   example: "teste@teste.com"
 *       404:
 *         description: "Usuário não encontrado"
 *         content:
 *           application/json:
 *             schema:
 *               type: "object"
 *               properties:
 *                 message:
 *                   type: "string"
 *                   example: "Usuáro não encontrado"
 */

userRouter.put('/users/:userId', userController.updateUser.bind(userController));

/**
 * @swagger
 * /users/{userId}:
 *   delete:
 *     tags:
 *       - Usuários
 *     summary: "Deletar um usuário existente"
 *     description: "Remove um usuário existente com base no ID fornecido"
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: "ID do usuário a ser deletado"
 *         schema:
 *           type: "integer"
 *           example: 3
 *     responses:
 *       204:
 *         description: "Usuário deletado com sucesso, sem conteúdo de resposta."
 *       404:
 *         description: "Usuário não encontrado"
 *         content:
 *           application/json:
 *             schema:
 *               type: "object"
 *               properties:
 *                 message:
 *                   type: "string"
 *                   example: "Usuáro não encontrado"
 */

userRouter.delete('/users/:userId', userController.deleteUser.bind(userController));

export default userRouter;



