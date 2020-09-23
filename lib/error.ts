interface ErrorInfo {
  result?: string;
  code?: string | number;
  name?: string;
  message?: string;
}

export class Error {
  public result: string = 'error';

  public code: string | number = '-1';

  public name: string = 'ERROR';

  public message: string = 'ERROR';

  constructor(error: ErrorInfo) {
    if (error.result != null) { this.result = error.result; }
    if (error.code != null) { this.code = error.code; }
    if (error.name != null) { this.name = error.name; }
    if (error.message != null) { this.message = error.message; }
  }

  static make(error: any): Error {
    return new Error(error);
  }

  static throwError(error: any): void {
    throw new Error(error);
  }

  static makeFail(name: string, message: string): Error {
    return new Error({
      result: 'failed',
      name,
      message,
    });
  }

  static throwFail(name: string, message: string): void {
    throw new Error({
      result: 'failed',
      name,
      message,
    });
  }
}

export default Error;
