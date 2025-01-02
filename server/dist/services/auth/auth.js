"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRefreshTokenToWhitelist = addRefreshTokenToWhitelist;
exports.findRefreshTokenById = findRefreshTokenById;
exports.deleteRefreshToken = deleteRefreshToken;
exports.revokeTokens = revokeTokens;
const prisma_1 = require("../../lib/prisma");
const hashToken_1 = require("../../lib/hashToken");
function addRefreshTokenToWhitelist(jti, refreshToken, userId) {
    return prisma_1.prisma.refreshToken.create({
        data: {
            id: jti,
            hashedToken: (0, hashToken_1.hashToken)(refreshToken),
            userId,
        },
    });
}
function findRefreshTokenById(id) {
    return prisma_1.prisma.refreshToken.findUnique({
        where: {
            id,
        },
    });
}
function deleteRefreshToken(id) {
    return prisma_1.prisma.refreshToken.update({
        where: {
            id,
        },
        data: {
            revoked: true,
        },
    });
}
function revokeTokens(userId) {
    return prisma_1.prisma.refreshToken.updateMany({
        where: {
            userId,
        },
        data: {
            revoked: true,
        },
    });
}
