const express = require('express');
const router = express.Router();
const letterController = require('../controllers/letterController');
const authMiddleware = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Letter
 *   description: 편지 관련 API
 */

/**
 * @swagger
 * /api/letters:
 *   post:
 *     summary: 편지 작성 (비회원 기능)
 *     description: 비회원이 login_id, sender_name, content를 전달해 편지를 저장합니다.
 *     tags: [Letter]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - login_id
 *               - sender_name
 *               - content
 *             properties:
 *               login_id:
 *                 type: string
 *                 description: 편지를 받는 유저의 login_id
 *                 example: "wonbin123"
 *               sender_name:
 *                 type: string
 *                 description: 편지를 보낸 사람 이름
 *                 example: "산타클로스"
 *               content:
 *                 type: string
 *                 description: 편지 내용
 *                 example: "행복한 연말 보내!"
 *
 *     responses:
 *       201:
 *         description: 편지가 성공적으로 저장됨
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "편지가 정상적으로 저장되었습니다."
 *                 letter:
 *                   type: object
 *                   properties:
 *                     letter_id:
 *                       type: integer
 *                       example: 1
 *                     user_id:
 *                       type: integer
 *                       example: 2
 *                     sender_name:
 *                       type: string
 *                       example: "산타"
 *                     content:
 *                       type: string
 *                       example: "고생 많았어!"
 *                     created_at:
 *                       type: string
 *                       example: "2025-11-22T15:30:00.000Z"
 */
router.post('/', letterController.createLetter);



/**
 * @swagger
 * /api/letters:
 *   get:
 *     summary: 편지 목록 조회 (회원만)
 *     description: 로그인한 회원의 트리에 온 편지 목록을 조회합니다.
 *     tags: [Letter]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: 편지 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "편지 목록 조회 성공"
 *                 letters:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       letter_id:
 *                         type: integer
 *                         example: 1
 *                       user_id:
 *                         type: integer
 *                         example: 2
 *                       sender_name:
 *                         type: string
 *                         example: "산타"
 *                       content:
 *                         type: string
 *                         example: "메리 크리스마스!"
 *                       created_at:
 *                         type: string
 *                         example: "2025-11-22T15:30:00.000Z"
 *       401:
 *         description: 로그인 필요
 */
router.get('/', authMiddleware, letterController.getLetterList);



/**
 * @swagger
 * /api/letters/{letter_id}:
 *   get:
 *     summary: 편지 단건 조회 (회원만)
 *     description: 로그인한 회원의 편지 중 특정 편지를 상세 조회합니다.
 *     tags: [Letter]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: letter_id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: 편지 상세 조회 성공
 *       401:
 *         description: 로그인 필요
 *       404:
 *         description: 편지를 찾을 수 없음
 */
router.get('/:letter_id', authMiddleware, letterController.getLetterDetail);

module.exports = router;
