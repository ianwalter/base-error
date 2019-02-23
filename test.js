import test from 'ava'
import BaseError from '.'

test('Error message gets captured', t => {
  const msg = 'Bad Request'
  const error = new BaseError(new Error(msg))
  t.is(error.message, msg)
})

test('String message gets captured as Error message', t => {
  const msg = 'Bad Request'
  const error = new BaseError(msg)
  t.is(error.message, msg)
})

test('Error stacktrace gets captured', t => {
  try {
    throw new Error('Unparseable')
  } catch (err) {
    const baseError = new BaseError(err)
    const stackLines = baseError.stack.split('\n')
    t.is(stackLines[0], 'Error: Unparseable')
    t.true(stackLines[1].includes('test.js:18:11'))
  }
})

test('String stacktrace gets captured', t => {
  const error = new BaseError('Undefined')
  const stackLines = error.stack.split('\n')
  t.is(stackLines[0], 'BaseError: Undefined')
  t.true(stackLines[1].includes('test.js:28:17'))
})

test('Class extension', t => {
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

test('Multiple parameter handling', t => {
  const msg = 'Bad Request'
  const arg2 = { thisis: { nested: true } }
  const arg3 = [1, 2, 3]
  const err = new BaseError(msg, arg2, arg3)
  t.is(err.message, `${msg}\n${JSON.stringify(arg2)}\n${JSON.stringify(arg3)}`)
})
