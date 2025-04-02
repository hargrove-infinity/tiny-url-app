export class ApplicationError extends Error {
  public statusCode: number;
  public errorCode: string;

  constructor(
    message: string,
    options: { statusCode: number; errorCode: string }
  ) {
    super(message);
    this.statusCode = options.statusCode;
    this.errorCode = options.errorCode;
  }

  get httpStatusCode() {
    return this.statusCode;
  }

  get appErrorCode() {
    return this.errorCode;
  }
}
