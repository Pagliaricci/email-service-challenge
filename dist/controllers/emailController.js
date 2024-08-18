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
exports.sendEmailHandler = void 0;
const emailService_1 = __importDefault(require("../services/emailService"));
// Ruta para enviar un correo electrónico
const sendEmailHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, recipient, subject, body } = req.body;
    try {
        const result = yield (0, emailService_1.default)(userId, recipient, subject, body);
        res.status(200).json({ message: result });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.sendEmailHandler = sendEmailHandler;
