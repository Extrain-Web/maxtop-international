export class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

/** wraps async route handlers so thrown errors reach the error middleware */
export const ah = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
