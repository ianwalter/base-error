const BaseError = require('../')

test('BaseError should capture the message if given an Error', () => {
  const msg = 'Bad Request'
  const error = new BaseError(new Error(msg))
  expect(error.message).toBe(msg)
})

test('BaseError should capture a string parameter as the error message', () => {
  const msg = 'Bad Request'
  const error = new BaseError(msg)
  expect(error.message).toBe(msg)
})

test('BaseError should capture the stacktrace if given an Error', () => {
  try {
    throw new Error('Unparseable')
  } catch (err) {
    const baseError = new BaseError(err)
    expect(baseError.stack).toMatchSnapshot()
  }
})

test('BaseError should create a stacktrace if given a string', () => {
  const error = new BaseError('Undefined')
  expect(error.stack).toMatchSnapshot()
})

test('BaseError should be able to be extended to create a custom Error', () => {
  class CustomError extends BaseError {
    constructor (err, code) {
      super(err)
      this.code = code
    }
  }

  const message = 'SyntaxError'
  const code = 1
  const error = new CustomError(message, code)
  expect(error.stack).toMatchSnapshot()
  expect(error.message).toBe(message)
  expect(error.code).toBe(code)
})
