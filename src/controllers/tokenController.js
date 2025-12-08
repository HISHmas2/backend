const { generateToken } = require("../utils/jwt");

exports.generateToken = (req, res) => {
    try {
        const { user_id, login_id, expiresIn } = req.body;

        if (!user_id || !login_id) {
            return res.status(400).json({
                message: "user_id, login_id 는 필수입니다."
            });
        }

        const payload = { user_id, login_id };

        const token = generateToken(payload, expiresIn || "1h");

        return res.json({
            message: "토큰 생성 성공",
            token,
            payload,
            expiresIn: expiresIn || "1h"
        });

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
