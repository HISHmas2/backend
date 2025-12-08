const { verifyToken } = require("../utils/jwt");

module.exports = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token)
        return res.status(401).json({ message: "로그인이 필요합니다." });

    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: "유효하지 않은 토큰입니다." });
    }
};
