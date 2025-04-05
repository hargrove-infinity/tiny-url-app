export class ApplicationError extends Error {
  public statusCode: number;
  public errorCode: string;
  public errorDescription: string;
  public errorId: string;
  public data: string[] = [];

  constructor(
    message: string,
    options: {
      statusCode: number;
      errorCode: string;
      errorDescription: string;
      errorId: string;
      data?: string[];
    }
  ) {
    super(message);
    this.statusCode = options.statusCode;
    this.errorCode = options.errorCode;
    this.errorDescription = options.errorDescription;
    this.errorId = options.errorId;
    this.data = options.data || [];
  }

  get httpStatusCode() {
    return this.statusCode;
  }

  buildErrorPayload() {
    return [
      {
        code: this.errorCode,
        description: this.errorDescription,
        id: this.errorId,
        data: this.data,
      },
    ];
  }
}
