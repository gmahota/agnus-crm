"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
exports.generateAccessToken = generateAccessToken;
exports.generateRefreshToken = generateRefreshToken;
exports.generateTokens = generateTokens;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_ACCESS_SECRET || "default-secret";
const generateToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: "7d" });
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    try {
        console.log(JWT_SECRET);
        return jsonwebtoken_1.default.verify(token, JWT_SECRET);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Token verification error:", error.message);
        }
        else {
            console.error("Token verification error:", error);
        }
        return null;
    }
};
exports.verifyToken = verifyToken;
// Usually I keep the token between 5 minutes - 15 minutes
function generateAccessToken(user) {
    return jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_ACCESS_SECRET, {
        expiresIn: '5m',
    });
}
// I choosed 8h because i prefer to make the user login again each day.
// But keep him logged in if he is using the app.
// You can change this value depending on your app logic.
// I would go for a maximum of 7 days, and make him login again after 7 days of inactivity.
function generateRefreshToken(user, jti) {
    return jsonwebtoken_1.default.sign({
        userId: user.id,
        jti
    }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: '8h',
    });
}
function generateTokens(user, jti) {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user, jti);
    return {
        accessToken,
        refreshToken,
    };
}
