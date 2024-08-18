"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const emailController_1 = require("../controllers/emailController");
const auth_1 = require("../middlewares/auth"); // Middleware para autenticar JWT
const router = (0, express_1.Router)();
router.post('/send', auth_1.authenticateJWT, emailController_1.sendEmailHandler);
exports.default = router;
