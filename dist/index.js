"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cert = exports.type = exports.Error = void 0;
const type_1 = require("./type");
const cert_1 = require("./cert");
var error_1 = require("./error");
Object.defineProperty(exports, "Error", { enumerable: true, get: function () { return error_1.Error; } });
exports.type = new type_1.Type();
exports.cert = new cert_1.Cert();
