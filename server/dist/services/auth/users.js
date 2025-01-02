"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByEmail = findUserByEmail;
exports.createUserByEmailAndPassword = createUserByEmailAndPassword;
exports.findUserById = findUserById;
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = require("../../lib/prisma");
function findUserByEmail(email) {
    return prisma_1.prisma.user.findUnique({
        where: {
            email,
        },
    });
}
function createUserByEmailAndPassword(user) {
    user.password = bcrypt_1.default.hashSync(user.password, 12);
    return prisma_1.prisma.user.create({
        data: user,
    });
}
function findUserById(id) {
    return prisma_1.prisma.user.findUnique({
        where: {
            id,
        },
    });
}
