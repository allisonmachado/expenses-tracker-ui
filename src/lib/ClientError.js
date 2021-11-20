export default class ClientError extends Error {
  constructor(statusCode, message) {
    super(message);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ClientError);
    }
    this.name = "ClientError";
    this.statusCode = statusCode;
  }
}