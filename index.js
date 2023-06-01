"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gateway = exports.Wrapper = void 0;
const wrapper_js_1 = __importDefault(require("./structures/wrapper.js"));
const gateway_js_1 = __importDefault(require("./structures/gateway.js"));
exports.Wrapper = wrapper_js_1.default;
exports.Gateway = gateway_js_1.default;
