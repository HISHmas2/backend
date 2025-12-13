const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const objectController = require('../controllers/objectController');

/**
 * @swagger
 * tags:
 *   name: Object
 *   description: 오브젝트 관련 API
 */

/**
 * @swagger
 * /api/objects:
 *   post:
 *     summary: 오브젝트 추가 (비회원 가능)
 *     tags: [Object]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - login_id
 *               - name
 *               - position_x
 *               - position_y
 *             properties:
 *               login_id:
 *                 type: string
 *                 example: user123
 *               name:
 *                 type: string
 *                 example: "sock"
 *               position_x:
 *                 type: number
 *                 example: 120
 *               position_y:
 *                 type: number
 *                 example: 200
 *     responses:
 *       201:
 *         description: 오브젝트 생성
 */
router.post('/', objectController.createObject);

/**
 * @swagger
 * /api/objects:
 *   get:
 *     summary: 로그인한 사용자의 오브젝트 전체 조회 (회원만)
 *     tags: [Object]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: 오브젝트 목록 반환
 *       401:
 *         description: 로그인 필요
 */
router.get('/', authMiddleware, objectController.getObjectsForUser);

/**
 *  추가: 비회원도 특정 트리(login_id)의 오브젝트 조회 가능
 * @swagger
 * /api/objects/public/{login_id}:
 *   get:
 *     summary: 특정 트리(login_id)의 오브젝트 전체 조회 (비회원 가능)
 *     tags: [Object]
 *     parameters:
 *       - in: path
 *         name: login_id
 *         required: true
 *         schema:
 *           type: string
 *         example: user123
 *     responses:
 *       200:
 *         description: 오브젝트 목록 반환
 *       404:
 *         description: 해당 login_id 유저 없음
 */
router.get('/public/:login_id', objectController.getObjectsByLoginIdPublic);

module.exports = router;
