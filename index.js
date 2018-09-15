module.exports = class BaseError extends Error {
  constructor (err) {
    super(err)
    if (err instanceof Error) {
      this.original = err
      this.stack = err.stack
      this.message = err.message
    } else {
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor)
      }
      this.message = err
    }
    this.name = this.constructor.name
  }
}
