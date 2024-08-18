"use strict";
// src/routes/authRoutes.ts
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const router = (0, express_1.Router)();
const authController = new authController_1.AuthController();
router.post('/register', authController.register);
router.post('/login', authController.login);
exports.default = router;
