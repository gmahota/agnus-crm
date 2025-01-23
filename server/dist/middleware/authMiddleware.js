"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jwt_1 = require("../lib/auth/jwt");
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res
            .status(401)
            .json({ error: "Authentication token is missing or invalid." });
    }
    const token = authHeader.split(" ")[1]; // Extrai o token após "Bearer "
    try {
        const decoded = (0, jwt_1.verifyToken)(token);
        if (!decoded) {
            return res.status(401).json({ error: "Invalid or expired token." });
        }
        req.user = decoded; // Anexa o usuário decodificado ao request
        next();
    }
    catch (error) {
        return res.status(401).json({ error: "Invalid or expired token." });
    }
};
exports.authenticateToken = authenticateToken;
