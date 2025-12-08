const LetterService = require('../services/letterService');
const UserModel = require('../models/userModel'); // 👈 추가됨


exports.createLetter = async (req, res) => {
    try {
        const { login_id, sender_name, content } = req.body;

        // 🔍 필수값 검증
        if (!login_id || !sender_name || !content) {
            return res.status(400).json({
                message: "login_id, sender_name, content는 필수입니다."
            });
        }

        // 🔍 login_id로 user_id 조회
        const user = await UserModel.findByLoginId(login_id);

        if (!user) {
            return res.status(404).json({
                message: "해당 login_id를 가진 사용자를 찾을 수 없습니다."
            });
        }

        // 🔥 실제 저장은 user.user_id 로 진행
        const newLetter = await LetterService.createLetter({
            user_id: user.user_id,
            sender_name,
            content
        });

        return res.status(201).json({
            message: "편지가 정상적으로 저장되었습니다.",
            letter: newLetter
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "서버 오류가 발생했습니다."
        });
    }
};


// ✅ (추가) 편지 목록 조회 (회원만)
exports.getLetterList = async (req, res) => {
    try {
        const userId = req.user.user_id; // authMiddleware가 토큰에서 세팅해줌

        const letters = await LetterService.getLetters(userId);

        res.status(200).json({
            message: "편지 목록 조회 성공",
            letters
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "서버 오류가 발생했습니다." });
    }
};


// ✅ (추가) 편지 단건 조회 (회원만 + 본인 편지만)
exports.getLetterDetail = async (req, res) => {
    try {
        const userId = req.user.user_id;
        const letterId = Number(req.params.letter_id);

        const letter = await LetterService.getLetterDetail(letterId, userId);

        if (!letter) {
            return res.status(404).json({ message: "편지를 찾을 수 없습니다." });
        }

        res.status(200).json({
            message: "편지 상세 조회 성공",
            letter
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "서버 오류가 발생했습니다." });
    }
};
