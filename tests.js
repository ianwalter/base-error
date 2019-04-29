const { test } = require('@ianwalter/bff')
const BaseError = require('.')

test('Error message gets captured', ({ expect }) => {
  const msg = 'Bad Request'
  const error = new BaseError(new Error(msg))
  expect(error.message).toBe(msg)
})

test('String message gets captured as Error message', ({ expect }) => {
  const msg = 'Bad Request'
  const error = new BaseError(msg)
  expect(error.message).toBe(msg)
})

test('Error stacktrace gets captured', ({ expect }) => {
  try {
    throw new Error('Unparseable')
  } catch (err) {
    const baseError = new BaseError(err)
    const stackLines = baseError.stack.split('\n')
    expect(stackLines[0]).toBe('Error: Unparseable')
    expect(stackLines[1]).toContain('tests.js:18:11')
  }
})

test('String stacktrace gets captured', ({ expect }) => {
  const error = new BaseError('Undefined')
  const stackLines = error.stack.split('\n')
  expect(stackLines[0]).toBe('BaseError: Undefined')
  expect(stackLines[1]).toContain('tests.js:28:17')
})

test('Class extension', ({ expect }) => {
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
  expect(stackLines[0]).toBe(`CustomError: ${message}`)
  expect(stackLines[1]).toContain('tests.js:44:17')
  expect(error.message).toBe(message)
  expect(error.code).toBe(code)
})

test('Multiple parameter handling', ({ expect }) => {
  const msg = 'Bad Request'
  const arg2 = { thisis: { nested: true } }
  const arg3 = [1, 2, 3]
  const err = new BaseError(msg, arg2, arg3)
  expect(err.message)
    .toBe(`${msg}\n${JSON.stringify(arg2)}\n${JSON.stringify(arg3)}`)
})
