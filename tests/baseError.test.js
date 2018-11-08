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
    const stackLines = baseError.stack.split('\n')
    expect(stackLines[0]).toBe('Error: Unparseable')
    expect(stackLines[1]).toContain('at Object.<anonymous>.test')
    expect(stackLines[2]).toContain('at Object.asyncJestTest (')
    expect(stackLines[3]).toContain('at resolve (')
    expect(stackLines[4]).toContain('at new Promise (')
    expect(stackLines[5]).toContain('at mapper (')
    expect(stackLines[6]).toContain('at promise.then (')
  }
})

test('BaseError should create a stacktrace if given a string', () => {
  const error = new BaseError('Undefined')
  const stackLines = error.stack.split('\n')
  expect(stackLines[0]).toBe('BaseError: Undefined')
  expect(stackLines[1]).toContain('at Object.<anonymous>.test')
  expect(stackLines[2]).toContain('at Object.asyncJestTest (')
  expect(stackLines[3]).toContain('at resolve (')
  expect(stackLines[4]).toContain('at new Promise (')
  expect(stackLines[5]).toContain('at mapper (')
  expect(stackLines[6]).toContain('at promise.then (')
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
  const stackLines = error.stack.split('\n')
  expect(stackLines[0]).toBe(`CustomError: ${message}`)
  expect(stackLines[1]).toContain('at Object.<anonymous>.test')
  expect(stackLines[2]).toContain('at Object.asyncJestTest (')
  expect(stackLines[3]).toContain('at resolve (')
  expect(stackLines[4]).toContain('at new Promise (')
  expect(stackLines[5]).toContain('at mapper (')
  expect(stackLines[6]).toContain('at promise.then (')
  expect(error.message).toBe(message)
  expect(error.code).toBe(code)
})

test('BaseError should output additional params', () => {
  const msg = 'Bad Request'
  const arg2 = { thisis: { nested: true } }
  const arg3 = [1, 2, 3]
  const error = new BaseError(msg, arg2, arg3)
  expect(error.message)
    .toBe(`${msg}\n${JSON.stringify(arg2)}\n${JSON.stringify(arg3)}`)
})
