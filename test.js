const assert = require('assert')
const deepRedact = require('.')

const result = JSON.stringify(
  deepRedact({
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
  }),
  null,
  2
)
const expected = JSON.stringify(
  {
    nested: {
      arr: [
        'w**h [String]',
        's*****s [String]',
        '** [String]',
        't*e [String]',
        'a***y [String]'
      ],
      mixed: [
        'w**h [String]',
        '******* [Boolean]',
        [
          'a*d [String]',
          'd****y [String]',
          'n****d [String]',
          {
            stuff: '* [Number]'
          }
        ]
      ],
      num: '1******1 [Number]',
      str: 's**************g [String]',
      blank: null
    }
  },
  null,
  2
)

assert.deepEqual(result, expected)

console.log('✅ Success!')
process.exit(0)
