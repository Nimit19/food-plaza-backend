export class CustomError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message || "Internal Server Error");
    this.statusCode = statusCode || 500;
  }
}
