# Frontend Utilities

The package does provide a bunch of reusable functions, classes and other utilities that may be useful to any frontend project.

_Note That:_ This does not lock you on any react or mui versions. Just a Vanilla Js.

## Setup

```sh
npm i @boonya/frontend-utils
```

## Utilities

### ExtendableError

The purpose of this utility class is to be like the normal Error class,
but change the name property to the name of the class by default.

```ts
import {ExtendableError} from '@boonya/frontend-utils';
```

```ts
new ExtendableError(message?: string, options?: ErrorOptions);
```
