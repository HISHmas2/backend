const express = require('express');
const router = express.Router();
const tokenController = require('../controllers/tokenController');

/**
 * @swagger
 * tags:
 *   name: Token
 *   description: JWT 토큰 테스트 및 생성
 */

/**
 * @swagger
 * /api/token/generate:
 *   post:
 *     summary: JWT 토큰 생성기
 *     tags: [Token]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: number
 *                 example: 1
 *               login_id:
 *                 type: string
 *                 example: "wonbin01"
 *               expiresIn:
 *                 type: string
 *                 example: "1h"
 *     responses:
 *       200:
 *         description: 토큰 생성 성공
 */
router.post('/generate', tokenController.generateToken);

module.exports = router;
