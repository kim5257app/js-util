"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Error = void 0;
class Error {
    constructor(error) {
        this.result = 'error';
        this.code = '-1';
        this.name = 'ERROR';
        this.message = 'ERROR';
        if (error.result != null) {
            this.result = error.result;
        }
        if (error.code != null) {
            this.code = error.code;
        }
        if (error.name != null) {
            this.name = error.name;
        }
        if (error.message != null) {
            this.message = error.message;
        }
    }
    static make(error) {
        return new Error(error);
    }
    static throwError(error) {
        throw new Error(error);
    }
    static makeFail(name, message) {
        return new Error({
            result: 'failed',
            name,
            message,
        });
    }
    static throwFail(name, message) {
        throw new Error({
            result: 'failed',
            name,
            message,
        });
    }
}
exports.Error = Error;
exports.default = Error;
