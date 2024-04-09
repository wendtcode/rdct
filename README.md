# redact( obj [, options] ) [![NPM](https://img.shields.io/npm/v/rdct.svg)](https://npmjs.com/package/rdct)

Deeply redact all the things


## Installation

`npm install --save rdct`


## Usage

`redact(object)`

```js
import redact from 'rdct';

let obj = {
    nested: {
        arr: ['with', 'strings', 'in', 'the', 'array'],
        mixed: ['with', false, ['and', 'deeply', 'nested', {stuff: 2}]],
        num: -17772.11,
        str: 'some long string',
        blank: null,
        missing: void 0,
        regex: /test/i,
        func: () => {}
    }
};

console.log(redact(obj, {includeType: true, min: 3}));
// {
//   nested: {
//     arr: [
//     'w**h [String]',
//     's*****s [String]',
//     '*** [String]',
//     't*e [String]',
//     'a***y [String]'
//     ],
//     mixed: [
//       'w**h [String]',
//       '******* [Boolean]',
//       [
//         'a*d [String]',
//         'd****y [String]',
//         'n****d [String]',
//         {
//           stuff: '*** [Number]'
//         }
//       ]
//     ],
//     num: '-1****.*1 [Number]',
//     str: 's**************g [String]',
//     blank: null
//   }
// }

```

## Options

### includeType

```js
redact('lorem ipsum', {includeType: true}) // l*********m [String]
redact(123.4222, {includeType: true}) // 1**.***2 [Number]
redact(false, {includeType: true}) // ******* [Boolean]
```

### char

```js
redact('lorem ipsum', {char: '?'}) // l?????????m
redact(123.4222, {char: '^'}) // 1^^.^^^2
redact(false, {char: '!'}) // !!!!!!!
```

### min
```js
redact('lorem ipsum', {min: 15}) // ***************
redact(123, {min: 3}) // 1*3
redact(true, {min: 2}) // ******* (Boolean disallows `min` less than 7)
```
