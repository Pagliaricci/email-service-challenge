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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const mail_1 = __importDefault(require("@sendgrid/mail"));
const prisma = new client_1.PrismaClient();
mail_1.default.setApiKey(process.env.SENDGRID_API_KEY || '');
function sendEmail(userId, recipient, subject, body) {
    return __awaiter(this, void 0, void 0, function* () {
        const now = new Date();
        const user = yield prisma.user.findUnique({ where: { id: userId } });
        if (!user)
            throw new Error('User not found');
        if (user.lastQuotaReset.toDateString() !== now.toDateString()) {
            yield prisma.user.update({
                where: { id: userId },
                data: { emailsSent: 0, lastQuotaReset: now },
            });
        }
        if (user.emailsSent >= 1000) {
            throw new Error('Quota exceeded for today');
        }
        const msg = {
            to: recipient,
            from: 'your_verified_sender@example.com',
            subject: subject,
            text: body,
        };
        try {
            yield mail_1.default.send(msg);
            yield prisma.email.create({
                data: {
                    userId,
                    recipient,
                    subject,
                    body,
                },
            });
            yield prisma.user.update({
                where: { id: userId },
                data: { emailsSent: user.emailsSent + 1 },
            });
            return 'Email sent successfully';
        }
        catch (error) {
            throw new Error('Error sending email: ' + error.message);
        }
    });
}
exports.default = sendEmail;
