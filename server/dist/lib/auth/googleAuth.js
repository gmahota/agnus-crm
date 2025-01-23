"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOrCreateUser = exports.verifyGoogleToken = void 0;
const google_auth_library_1 = require("google-auth-library");
const prisma_1 = require("../../lib/prisma");
const client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const verifyGoogleToken = async (token) => {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    return payload; // Retorna email, name, picture, etc.
};
exports.verifyGoogleToken = verifyGoogleToken;
const findOrCreateUser = async (googleUser) => {
    const existingUser = await prisma_1.prisma.user.findUnique({
        where: { email: googleUser.email },
    });
    if (existingUser) {
        return existingUser;
    }
    const newUser = await prisma_1.prisma.user.create({
        data: {
            email: googleUser.email,
            name: googleUser.name || null,
            password: "", // Não obrigatório para Google Auth
            profile: {
                create: {
                    bio: "Usuário criado via Google OAuth",
                },
            },
        },
    });
    return newUser;
};
exports.findOrCreateUser = findOrCreateUser;
