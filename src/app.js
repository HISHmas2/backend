const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

const { swaggerUi, swaggerSpec } = require("./config/swagger");

// ⭐ CORS 설정 (쿠키 + 특정 도메인 허용)
app.use(cors({
    origin: [
        "http://localhost:3000",   // React 개발 환경
        "http://localhost:8080",
        "http://3.37.68.90",
        "https://www.hishmas.site",
        "https://hishmas.site",
    ],
    credentials: true,            // ⭐ 쿠키 허용
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
}));

// 기본 미들웨어
app.use(express.json());
app.use(cookieParser());

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 라우트 등록
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const tokenRoutes = require("./routes/tokenRoutes");
const letterRoutes = require("./routes/letterRoutes");
const objectRoutes = require("./routes/objectRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/token", tokenRoutes);
app.use("/api/letters", letterRoutes);
app.use("/api/objects", objectRoutes);

/**
 * @swagger
 * /:
 *   get:
 *     summary: 기본 라우트
 *     responses:
 *       200:
 *         description: 서버 정상 동작 메시지
 */
app.get("/", (req, res) => {
    res.send("Hello from Express!");
});

module.exports = app;
