interface ErrorInfo {
    result?: string;
    code?: string | number;
    name?: string;
    message?: string;
}
export declare class Error {
    result: string;
    code: string | number;
    name: string;
    message: string;
    constructor(error: ErrorInfo);
    static make(error: any): Error;
    static throwError(error: any): void;
    static makeFail(name: string, message: string): Error;
    static throwFail(name: string, message: string): void;
}
export {};
