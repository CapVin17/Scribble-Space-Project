"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatebloginput = exports.bloginput = exports.signininput = exports.signupinput = void 0;
const zod_1 = __importDefault(require("zod"));
// 1
exports.signupinput = zod_1.default.object({
    email: zod_1.default.string().email(),
    name: zod_1.default.string(),
    password: zod_1.default.string().min(6),
});
//2
exports.signininput = zod_1.default.object({
    name: zod_1.default.string(),
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(6),
});
// 3
exports.bloginput = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string().max(150),
});
//4
exports.updatebloginput = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string().max(150),
    id: zod_1.default.string(),
});
