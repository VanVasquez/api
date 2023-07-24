"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const credentials_1 = require("./middleware/credentials");
const route_1 = __importDefault(require("./route"));
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
const uri = 'mongodb://127.0.0.1:27017/test';
mongoose_1.default.connect(uri);
const db = mongoose_1.default.connection;
db.on('connected', () => {
    console.log('⚡️[database]: Mongoose is connected');
});
app.use(express_1.default.urlencoded({ extended: true }));
app.use(credentials_1.credentials);
app.use((0, cors_1.default)({ origin: credentials_1.allowedOrigins }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use('/api', route_1.default);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
exports.default = app;
