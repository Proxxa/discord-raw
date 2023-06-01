"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authenticator_js_1 = __importDefault(require("./authenticator.js"));
const utils_js_1 = require("../utils.js");
const node_fetch_1 = __importDefault(require("node-fetch"));
const node_fetch_2 = require("node-fetch");
class Wrapper {
    constructor(token) {
        let mustBeString;
        if ((0, utils_js_1.isDefined)(token))
            mustBeString = token;
        else if ((0, utils_js_1.isDefined)(process.env.DISCORD_TOKEN))
            mustBeString = process.env.DISCORD_TOKEN;
        else
            throw new Error("Could not find discord token");
        this.authenticator = new authenticator_js_1.default(mustBeString);
    }
    /**
     * A general function for fetching from the api.
     *
     *
     * @param path The path in the api to fetch.
     * @returns A promise to the requested data
     */
    fetch(path, options) {
        if (!(0, utils_js_1.isDefined)(options))
            options = { method: "GET" };
        options.headers = new node_fetch_2.Headers(options.headers);
        options.headers.set("Authorization", this.authenticator.createAuthString());
        switch (options.method) {
            case "POST":
                options.headers.set("Content-Type", "application/json");
                break;
            case "PUSH":
                options.headers.set("Content-Type", "application/json");
                break;
            case "PATCH":
                options.headers.set("Content-Type", "application/json");
                break;
        }
        return (0, node_fetch_1.default)('https://discord.com/api/v10/' + path, options);
    }
    /**
     * A general function for fetching from the api.
     *
     *
     * @param path The path in the api to fetch.
     * @returns A promise to the requested data
     */
    get(path, options) {
        if (!(0, utils_js_1.isDefined)(options))
            options = {};
        options.method = "GET";
        return this.fetch(path, options);
    }
    /**
     * A general function for fetching from the api.
     *
     *
     * @param path The path in the api to fetch.
     * @returns A promise to the requested data
     */
    head(path, options) {
        if (!(0, utils_js_1.isDefined)(options))
            options = {};
        options.method = "head";
        return this.fetch(path, options);
    }
    /**
     * A general function for fetching from the api.
     *
     *
     * @param path The path in the api to fetch.
     * @returns A promise to the requested data
     */
    delete(path, options) {
        if (!(0, utils_js_1.isDefined)(options))
            options = {};
        options.method = "DELETE";
        return this.fetch(path, options);
    }
    /**
     * A general function for fetching from the api.
     *
     *
     * @param path The path in the api to fetch.
     * @returns A promise to the requested data
     */
    connect(path, options) {
        if (!(0, utils_js_1.isDefined)(options))
            options = {};
        options.method = "CONNECT";
        return this.fetch(path, options);
    }
    /**
     * A general function for fetching from the api.
     *
     *
     * @param path The path in the api to fetch.
     * @returns A promise to the requested data
     */
    patch(path, options) {
        if (!(0, utils_js_1.isDefined)(options))
            options = {};
        options.method = "PATCH";
        return this.fetch(path, options);
    }
    /**
     * A general function for fetching from the api.
     *
     *
     * @param path The path in the api to fetch.
     * @returns A promise to the requested data
     */
    post(path, options) {
        const fullpath = `https://discord.com/api/${path}`;
        if (!(0, utils_js_1.isDefined)(options))
            options = {};
        options.method = "POST";
        return this.fetch(fullpath, options);
    }
}
exports.default = Wrapper;
