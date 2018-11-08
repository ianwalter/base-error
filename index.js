function formatErrorMessage (msg, additional) {
  return additional.length
    ? additional.reduce((a, c) => `${a}\n${JSON.stringify(c)}`, msg)
    : msg
}

export default class BaseError extends Error {
  constructor (err, ...additional) {
    super(formatErrorMessage(err, additional))
    if (err instanceof Error) {
      this.original = err
      this.stack = err.stack
      this.message = formatErrorMessage(err.message, additional)
    } else {
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor)
      }
      this.message = formatErrorMessage(err, additional)
    }
    this.name = this.constructor.name
  }
}
