const AuthService = require('../services/authService');

exports.signup = async (req, res) => {
    try {
        const { login_id, name, password } = req.body;
        const user = await AuthService.signup({ login_id, name, password });
        res.status(201).json({ message: "회원가입 성공", user });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { login_id, password } = req.body;

        const { token, user } = await AuthService.login({ login_id, password });

        res.cookie("access_token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 1000 * 60 * 60,
        });

        res.json({
            message: "로그인 성공",
            user,
        });

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.logout = (req, res) => {
    res.clearCookie("access_token");
    res.json({ message: "로그아웃 완료" });
};
