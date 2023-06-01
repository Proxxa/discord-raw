"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDefined = exports.bypassGuard = void 0;
const bypassGuard = (x) => true;
exports.bypassGuard = bypassGuard;
const isDefined = (x) => x != undefined;
exports.isDefined = isDefined;
