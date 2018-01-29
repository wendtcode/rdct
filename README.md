# `deepRedact(obj)` [![NPM](https://img.shields.io/npm/v/deep-redact.svg)](https://npmjs.com/package/deep-redact)

> Deeply redact all the things


### Installation

`npm install --save deep-redact`


### Usage

`deepRedact(object)`

```js
import deepRedact from 'deep-redact';

let obj = {
    nested: {
        arr: ['with', 'strings', 'in', 'the', 'array'],
        mixed: ['with', false, ['and', 'deeply', 'nested', {stuff: 2}]],
        num: 17772.11,
        str: 'some long string',
        blank: null,
        missing: void 0,
        regex: /test/i,
        func: () => {}
    }
};

console.log(deepRedact(obj));
// {
//   nested: {
//     arr: [
//     'w**h [String]',
//     's*****s [String]',
//     '** [String]',
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
//           stuff: '* [Number]'
//         }
//       ]
//     ],
//     num: '1******1 [Number]',
//     str: 's**************g [String]',
//     blank: null
//   }
// }

```
