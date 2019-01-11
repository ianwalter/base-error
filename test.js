import test from 'ava'
import BaseError from '.'

test('BaseError should capture the message if given an Error', t => {
  const msg = 'Bad Request'
  const error = new BaseError(new Error(msg))
  t.is(error.message, msg)
})

test('BaseError should capture a string parameter as the error message', t => {
  const msg = 'Bad Request'
  const error = new BaseError(msg)
  t.is(error.message, msg)
})

test('BaseError should capture the stacktrace if given an Error', t => {
  try {
    throw new Error('Unparseable')
  } catch (err) {
    const baseError = new BaseError(err)
    const stackLines = baseError.stack.split('\n')
    t.is(stackLines[0], 'Error: Unparseable')
    t.true(stackLines[1].includes('test.js:18:11'))
  }
})

test('BaseError should create a stacktrace if given a string', t => {
  const error = new BaseError('Undefined')
  const stackLines = error.stack.split('\n')
  t.is(stackLines[0], 'BaseError: Undefined')
  t.true(stackLines[1].includes('test.js:28:17'))
})

test('BaseError should be able to be extended to create a custom Error', t => {
  class CustomError extends BaseError {
    constructor (err, code) {
      super(err)
      this.code = code
    }
  }

  const message = 'SyntaxError'
  const code = 1
  const error = new CustomError(message, code)
  const stackLines = error.stack.split('\n')
  t.is(stackLines[0], `CustomError: ${message}`)
  t.true(stackLines[1].includes('test.js:44:17'))
  t.is(error.message, message)
  t.is(error.code, code)
})

test('BaseError should output additional params', t => {
  const msg = 'Bad Request'
  const arg2 = { thisis: { nested: true } }
  const arg3 = [1, 2, 3]
  const err = new BaseError(msg, arg2, arg3)
  t.is(err.message, `${msg}\n${JSON.stringify(arg2)}\n${JSON.stringify(arg3)}`)
})
