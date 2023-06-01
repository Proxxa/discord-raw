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
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _Gateway_token;
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const ws_1 = __importDefault(require("ws"));
class Gateway {
    constructor(token) {
        /*
         * Using builtin JS privacy to bypass console logging.
         */
        _Gateway_token.set(this, void 0);
        this.queuedEvents = [];
        let mustBeString;
        if ((0, utils_1.isDefined)(token))
            mustBeString = token;
        else if ((0, utils_1.isDefined)(process.env.DISCORD_TOKEN))
            mustBeString = process.env.DISCORD_TOKEN;
        else
            throw new Error("Could not find discord token");
        __classPrivateFieldSet(this, _Gateway_token, mustBeString, "f");
    }
    connect() {
        if ((0, utils_1.isDefined)(this.ws))
            this.ws.close();
        (() => __awaiter(this, void 0, void 0, function* () {
            let headers = new Headers();
            headers.set("Authorization", "Bot " + __classPrivateFieldGet(this, _Gateway_token, "f"));
            let response = yield fetch('https://discord.com/api/v10/gateway/bot', { headers: headers }).then(res => res.json());
            console.log(response);
            let url = response.url + '/?v=10&encoding=json';
            this.ws = new ws_1.default(url);
            for (const ev of this.queuedEvents)
                this.ws.on(ev[0], ev[1]);
        }))();
    }
    login() {
        var _a;
        if (!(0, utils_1.isDefined)(this.ws)) {
            this.queuedEvents.push(["open", () => {
                    var _a;
                    return (_a = this.ws) === null || _a === void 0 ? void 0 : _a.send(Buffer.from(JSON.stringify({
                        op: 2,
                        d: {
                            token: __classPrivateFieldGet(this, _Gateway_token, "f"),
                            intents: 513,
                            properties: {
                                os: "linux",
                                browser: "ok",
                                device: "ok",
                            }
                        }
                    })));
                }]);
            return;
        }
        switch (this.ws.readyState) {
            case this.ws.CONNECTING:
                this.ws.on('open', () => {
                    var _a;
                    return (_a = this.ws) === null || _a === void 0 ? void 0 : _a.send(Buffer.from(JSON.stringify({
                        op: 2,
                        d: {
                            token: __classPrivateFieldGet(this, _Gateway_token, "f"),
                            intents: 513,
                            properties: {
                                os: "linux",
                                browser: "ok",
                                device: "ok",
                            }
                        }
                    })));
                });
                break;
            case this.ws.OPEN:
                (_a = this.ws) === null || _a === void 0 ? void 0 : _a.send(Buffer.from(JSON.stringify({
                    op: 2,
                    d: {
                        token: __classPrivateFieldGet(this, _Gateway_token, "f"),
                        intents: 513,
                        properties: {
                            os: "linux",
                            browser: "ok",
                            device: "ok",
                        }
                    }
                })));
                break;
            default:
                throw new Error("Cannot login to closing or closed gateway");
                break;
        }
    }
    on(event, callback) {
        if ((0, utils_1.isDefined)(this.ws)) {
            this.ws.on(event, callback);
        }
        else {
            this.queuedEvents.push([event, callback]);
        }
    }
    send(d) {
        if ((0, utils_1.isDefined)(this.ws))
            this.ws.send(d);
    }
}
exports.default = Gateway;
_Gateway_token = new WeakMap();
