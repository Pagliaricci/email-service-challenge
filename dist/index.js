"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const register_1 = __importDefault(require("./routes/register"));
const login_1 = __importDefault(require("./routes/login"));
const auth_1 = require("./middlewares/auth");
const stats_1 = __importDefault(require("./routes/stats"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Rutas públicas
app.use('/register', register_1.default);
app.use('/login', login_1.default);
app.use('/stats', stats_1.default);
// Ruta protegida como ejemplo
app.get('/protected', auth_1.authenticateJWT, (req, res) => {
    res.send('This is a protected route');
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
