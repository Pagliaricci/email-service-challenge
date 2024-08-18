"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const auth_1 = require("../middlewares/auth");
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
router.get('/', auth_1.authenticateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (user.role !== 'ADMIN') {
        return res.status(403).json({ message: 'Forbidden' });
    }
    try {
        const users = yield prisma.user.findMany({
            where: { emailsSent: { gt: 0 } },
            select: {
                username: true,
                emailsSent: true,
            },
        });
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}));
exports.default = router;
