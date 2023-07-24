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
exports.GetAllAccounts = exports.DeleteAccount = exports.EditAccount = exports.LoginAccount = exports.CreateAccount = void 0;
const User_1 = __importDefault(require("../model/User"));
const CreateAccount = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = new User_1.default(data);
        const savedUser = yield user.save();
        return {
            statusCode: 201,
            message: 'Account successfully registered',
            data: savedUser,
        };
    }
    catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            message: 'Error registering the account',
        };
    }
});
exports.CreateAccount = CreateAccount;
const LoginAccount = ({ username, password, }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findOne({ username: username });
        if (!user) {
            return {
                statusCode: 404,
                message: 'User not found',
            };
        }
        if (user.password !== password) {
            return { statusCode: 404, message: 'Invalid password' };
        }
        return { statusCode: 200, data: user };
    }
    catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            message: 'Error registering the account',
        };
    }
});
exports.LoginAccount = LoginAccount;
const EditAccount = ({ id, name, bio, }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(id);
        if (!user) {
            return { statusCode: 404, message: 'User not found' };
        }
        if (name) {
            user.name = name;
        }
        if (bio) {
            user.bio = bio;
        }
        yield user.save();
        return {
            statusCode: 200,
            message: 'Success',
        };
    }
    catch (err) {
        return { statusCode: 500, message: 'An error occurred' };
    }
});
exports.EditAccount = EditAccount;
const DeleteAccount = ({ id }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield User_1.default.findByIdAndDelete(id);
        return {
            statusCode: 200,
            message: 'Success',
        };
    }
    catch (err) {
        return { statusCode: 500, message: 'An error occurred' };
    }
});
exports.DeleteAccount = DeleteAccount;
const GetAllAccounts = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield User_1.default.find({});
    return {
        statusCode: 200,
        message: 'Accounts',
        data: users,
    };
});
exports.GetAllAccounts = GetAllAccounts;
