const { print } = require('@ianwalter/print')
const BaseError = require('.')

// Extend BaseError to create your custom error and optionally pass additional
// data to be included in the error message/object.
class SomeError extends BaseError {
  constructor (details) {
    super('Something happened', details)
  }
}

// Implementation example:
const someError = new SomeError({ user: 1 })
if (someError instanceof SomeError) {
  print.error(someError)
}
