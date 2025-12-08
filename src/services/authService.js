const bcrypt = require('bcryptjs');
const UserModel = require('../models/userModel');
const { generateToken } = require('../utils/jwt');

const AuthService = {
    async signup({ login_id, name, password }) {
        // 로그인 아이디 중복 확인
        const existing = await UserModel.findByLoginId(login_id);
        if (existing) throw new Error("이미 존재하는 로그인 아이디입니다.");

        // 비밀번호 해싱
        const hashedPassword = await bcrypt.hash(password, 10);

        // hashed_user_id, tree_url 제거
        return await UserModel.createUser({
            login_id,
            name,
            password: hashedPassword
        });
    },

    async login({ login_id, password }) {
        const user = await UserModel.findByLoginId(login_id);
        if (!user) throw new Error("아이디 또는 비밀번호가 잘못되었습니다.");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error("아이디 또는 비밀번호가 잘못되었습니다.");

        const token = generateToken({
            user_id: user.user_id,
            login_id: user.login_id,
        });

        return { token, user };
    },
};

module.exports = AuthService;
