# @ianwalter/base-error
> A general base Error class that can be extended to create custom Error classes

[![npm page][npmImage]][npmUrl]
[![CI][ciImage]][ciUrl]

## Installation

```console
npm install @ianwalter/base-error --save
```

## Usage

```js
import BaseError from '@ianwalter/base-error'

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
  console.error(someError)
}
/*
Logs an error like:

SomeError: Something happened
{
  "user": 1
}
(stacktrace)
*/
```

## License

Hippocratic License - See [LICENSE][licenseUrl]

&nbsp;

Created by [Ian Walter](https://ianwalter.dev)

[npmImage]: https://img.shields.io/npm/v/@ianwalter/base-error.svg
[npmUrl]: https://www.npmjs.com/package/@ianwalter/base-error
[ciImage]: https://github.com/ianwalter/base-error/workflows/CI/badge.svg
[ciUrl]: https://github.com/ianwalter/base-error/actions
[licenseUrl]: https://github.com/ianwalter/base-error/blob/master/LICENSE
