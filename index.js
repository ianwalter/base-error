module.exports = class BaseError extends Error {
  constructor (message) {
    super(message)
    this.name = this.constructor.name
    // TODO:
    // Error.captureStackTrace(this, this.constructor)
  }
}
