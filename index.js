const format = (msg, rest) => rest.length
  ? rest.reduce((acc, i) => `${acc}\n${JSON.stringify(i, undefined, 2)}`, msg)
  : msg

export default class BaseError extends Error {
  constructor (err, ...rest) {
    if (err instanceof Error) {
      super(format(err.message, rest))
      this.original = err
      this.stack = err.stack
    } else {
      super(format(err, rest))
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor)
      }
    }
    //this.name = this.constructor.name
  }
}
