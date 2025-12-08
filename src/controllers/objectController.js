const ObjectService = require('../services/objectService');
const UserModel = require('../models/userModel'); // ⭐ 추가

// 오브젝트 생성 (비회원 가능)
exports.createObject = async (req, res) => {
    try {
        const { login_id, name, position_x, position_y } = req.body;

        // 필수 값 검증
        if (!login_id || !name || position_x === undefined || position_y === undefined) {
            return res.status(400).json({
                message: "login_id, name, position_x, position_y는 필수입니다."
            });
        }

        // login_id → user_id 조회
        const user = await UserModel.findByLoginId(login_id);

        if (!user) {
            return res.status(404).json({
                message: "해당 login_id를 가진 사용자를 찾을 수 없습니다."
            });
        }

        const object = await ObjectService.create({
            name,
            user_id: user.user_id, // ⭐ user_id 주입
            position_x,
            position_y
        });

        return res.status(201).json({
            message: "object created",
            object
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
    }
};


// ⭐ 로그인한 사용자 오브젝트 목록 조회
exports.getObjectsForUser = async (req, res) => {
    try {
        const user_id = req.user.user_id;

        const objects = await ObjectService.findAllByUserId(user_id);

        return res.status(200).json({
            message: "objects fetched",
            objects
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
    }
};
