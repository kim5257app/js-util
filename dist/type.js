"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Type {
    static isJSON(str) {
        let ret = true;
        try {
            JSON.parse(str);
        }
        catch (error) {
            ret = false;
        }
        return ret;
    }
    static unescapeUnicode(data) {
        function loopUnescape(child) {
            let ret = null;
            switch (typeof child) {
                case 'object': {
                    if (child != null) {
                        ret = {};
                        Object.entries(child).forEach(([key, value]) => {
                            ret[key] = loopUnescape(value);
                        });
                    }
                    else {
                        ret = null;
                    }
                    break;
                }
                case 'string':
                    ret = child.replace(/\u200B/g, '').trim();
                    break;
                default:
                    ret = child;
                    break;
            }
            return ret;
        }
        return loopUnescape(data);
    }
}
exports.default = Type;
