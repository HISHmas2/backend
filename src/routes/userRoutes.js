const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: User
 *   description: 유저 관련 API
 */

/**
 * @swagger
 * /api/user/me:
 *   get:
 *     summary: 로그인한 사용자 정보 조회
 *     tags: [User]
 *     security:
 *       - BearerAuth: []     # ⭐ JWT 필요함!
 *     responses:
 *       200:
 *         description: 유저 정보 반환
 */
router.get('/me', authMiddleware, (req, res) => {
    res.json({
        message: "토큰 인증 성공!",
        user: req.user,
    });
});

module.exports = router;
