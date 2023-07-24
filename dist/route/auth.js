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
const authentication_controller_1 = require("../controller/authentication.controller");
const route = (0, express_1.Router)();
route.get('/all', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { statusCode, message, data } = yield (0, authentication_controller_1.GetAllAccounts)();
    return res.status(statusCode).json({ message, data });
}));
route.post('/register', ({ body }, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { statusCode, message, data } = yield (0, authentication_controller_1.CreateAccount)(body);
    return res.status(statusCode).json({ message, data });
}));
route.get('/login', ({ query }, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = query;
    const { statusCode, message, data } = yield (0, authentication_controller_1.LoginAccount)({
        username: username,
        password: password,
    });
    return res.status(statusCode).json({ message, data });
}));
route.put('/update/id/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, bio } = req.body;
    const { id } = req.params;
    const { statusCode, message, data } = yield (0, authentication_controller_1.EditAccount)({ id, name, bio });
    return res.status(statusCode).json({ message, data });
}));
route.delete('/remove/userId/:userId', ({ params }, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = params;
    const { statusCode, message, data } = yield (0, authentication_controller_1.DeleteAccount)({ id: userId });
    return res.status(statusCode).json({ message, data });
}));
exports.default = route;
