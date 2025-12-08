const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: 회원가입 및 인증 관련 API
 */

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: 회원가입
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               login_id:
 *                 type: string
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: 회원가입 성공
 */
router.post('/signup', authController.signup);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: 로그인 (쿠키에 JWT 저장)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               login_id:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: 로그인 성공
 */
router.post('/login', authController.login);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: 로그아웃 (쿠키 삭제)
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: 로그아웃 성공
 */
router.post('/logout', authController.logout);

module.exports = router;
