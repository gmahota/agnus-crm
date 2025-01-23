"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = require("../../lib/prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("../../lib/auth/jwt");
const zod_1 = require("zod");
const router = (0, express_1.Router)();
// Zod schemas
const createUserNameSchema = zod_1.z.object({
    email: zod_1.z.string(),
    password: zod_1.z.string(),
});
router.post('/login', async (req, res) => {
    const { email, password } = createUserNameSchema.parse(req.body);
    req.body;
    try {
        const user = await prisma_1.prisma.user.findUnique({
            where: { email },
            include: { profile: true },
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // TODO: Implement password validation logic here
        const isValidPassword = await bcrypt_1.default.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        // TODO: Generate and return JWT token
        const jwtToken = (0, jwt_1.generateAccessToken)(user);
        res.status(200).json({
            message: "Login successful",
            token: jwtToken,
            User: {
                email: user.email,
                name: user.name,
                Profile: user.profile,
            },
        });
    }
    catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.default = router;
