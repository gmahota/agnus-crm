"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uuid_1 = require("uuid");
const zod_1 = require("zod");
const bcrypt_1 = __importDefault(require("bcrypt"));
const users_1 = require("../services/auth/users");
const jwt_1 = require("../lib/auth/jwt");
const auth_1 = require("../services/auth/auth");
const googleAuth_1 = require("../lib/auth/googleAuth");
const authRouter = (0, express_1.Router)();
// Registro de novo usuário
authRouter.post("/register", async (req, res, next) => {
    try {
        const createUserSchema = zod_1.z.object({
            id: zod_1.z.string().uuid().default((0, uuid_1.v4)()),
            email: zod_1.z.string().email(),
            name: zod_1.z.string().optional().default(""),
            username: zod_1.z.string().optional().default(""),
            firstName: zod_1.z.string().optional().default(""),
            lastName: zod_1.z.string().optional().default(""),
            phoneNumber: zod_1.z.string().optional().default(""),
            password: zod_1.z.string(),
            confirmPassword: zod_1.z.boolean().optional().default(false),
            inactive: zod_1.z.boolean().default(false),
            country: zod_1.z.string().default("Moz"),
            createdAt: zod_1.z.date().default(() => new Date()),
            updatedAt: zod_1.z.date().default(() => new Date()),
        });
        const { email, password } = createUserSchema.parse(req.body);
        if (!email || !password) {
            res.status(400);
            throw new Error("You must provide an email and a password.");
        }
        const existingUser = await (0, users_1.findUserByEmail)(email);
        if (existingUser) {
            res.status(400);
            throw new Error("Email already in use.");
        }
        const _user = createUserSchema.parse(req.body);
        const user = await (0, users_1.createUserByEmailAndPassword)(_user);
        const jti = (0, uuid_1.v4)();
        const { accessToken, refreshToken } = (0, jwt_1.generateTokens)(user, jti);
        await (0, auth_1.addRefreshTokenToWhitelist)(jti, refreshToken, user.id);
        res.json({ accessToken, refreshToken });
    }
    catch (err) {
        next(err);
    }
});
// Login com email e senha
authRouter.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res
                .status(400)
                .send("You must provide an email and a password.");
        }
        const existingUser = await (0, users_1.findUserByEmail)(email);
        if (!existingUser) {
            return res.status(403).send("Invalid login credentials.");
        }
        const validPassword = await bcrypt_1.default.compare(password, existingUser.password);
        if (!validPassword) {
            return res.status(403).send("Invalid login credentials.");
        }
        const jti = (0, uuid_1.v4)();
        const { accessToken, refreshToken } = (0, jwt_1.generateTokens)(existingUser, jti);
        await (0, auth_1.addRefreshTokenToWhitelist)(jti, refreshToken, existingUser.id);
        res.json({ accessToken, refreshToken });
    }
    catch (err) {
        next(err);
    }
});
// Login com Google
authRouter.post("/google", async (req, res, next) => {
    try {
        const { token } = req.body;
        if (!token) {
            return res.status(400).send("Google token is required.");
        }
        const googleUser = await (0, googleAuth_1.verifyGoogleToken)(token);
        if (!googleUser || !googleUser.email) {
            return res.status(401).send("Invalid Google authentication.");
        }
        const user = await (0, googleAuth_1.findOrCreateUser)(googleUser);
        const jti = (0, uuid_1.v4)();
        const { accessToken, refreshToken } = (0, jwt_1.generateTokens)(user, jti);
        await (0, auth_1.addRefreshTokenToWhitelist)(jti, refreshToken, user.id);
        res.json({ accessToken, refreshToken, user });
    }
    catch (err) {
        next(err);
    }
});
// Rota protegida (exemplo)
authRouter.get("/protected", async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).send("Token is required.");
        }
        const decoded = (0, jwt_1.verifyToken)(token);
        if (!decoded) {
            return res.status(401).send("Invalid token.");
        }
        res.json({ message: "Protected route accessed.", user: decoded });
    }
    catch (err) {
        next(err);
    }
});
exports.default = authRouter;
