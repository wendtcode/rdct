import rdct, {Redact} from './index'

describe('rdct()', () => {
  describe('no options', () => {
    test('short string', () => {
      expect(rdct('foo')).toEqual('*****')
    })
    test('longer string', () => {
      expect(rdct('lorem ipsum')).toEqual('l*********m')
    })
    test('whole number', () => {
      expect(rdct(1234567)).toEqual('1*****7')
    })
    test('fractional number', () => {
      expect(rdct(123.456)).toEqual('1**.**6')
    })
    test('negative number', () => {
      expect(rdct(-987654)).toEqual('-9****4')
    })
    test('boolean true', () => {
      expect(rdct(true)).toEqual('*******')
    })
    test('boolean false', () => {
      expect(rdct(false)).toEqual('*******')
    })
    test('simple objects', () => {
      let obj = {foo: 'bar', baz: 'lorem ipsum'}
      let expected = {foo: '*****', baz: 'l*********m'}
      let result = rdct(obj)
      expect(result).toMatchObject(expected)
    })
    test('nested objects', () => {
      let obj = {foo: {bar: 'baz'}}
      let expected = {foo: {bar: '*****'}}
      let result = rdct(obj)
      expect(result).toMatchObject(expected)
    })
    test('null', () => {
      expect(rdct(null)).toEqual(null)
    })
    test('undefined', () => {
      expect(rdct(void 0)).toEqual(void 0)
    })
    test('array of short strings', () => {
      expect(rdct(['foo', 'bar'])).toEqual(['*****', '*****'])
    })
    test('array of longer strings', () => {
      expect(rdct(['lorem ipsum', 'bacon ipsum'])).toEqual([
        'l*********m',
        'b*********m'
      ])
    })
    test('array of whole numbers', () => {
      expect(rdct([1234567, 9876543])).toEqual(['1*****7', '9*****3'])
    })
    test('array of fractional numbers', () => {
      expect(rdct([1234.567, 987.6543])).toEqual(['1***.**7', '9**.***3'])
    })
    test('array of negative numbers', () => {
      expect(rdct([-1234567, -9876543])).toEqual(['-1*****7', '-9*****3'])
    })
    test('array of boolean trues', () => {
      expect(rdct([true, true])).toEqual(['*******', '*******'])
    })
    test('array of boolean falses', () => {
      expect(rdct([false, false])).toEqual(['*******', '*******'])
    })
    test('array of nulls', () => {
      expect(rdct([null, null])).toEqual([null, null])
    })
    test('array of undefineds', () => {
      expect(rdct([void 0, void 0])).toEqual([void 0, void 0])
    })
    test('array of simple objects', () => {
      let input = [
        {foo: 'bar', baz: 'lorem ipsum'},
        {foo2: 'bar2', baz2: 'bacon ipsum'}
      ]
      let expected = [
        {foo: '*****', baz: 'l*********m'},
        {foo2: '*****', baz2: 'b*********m'}
      ]
      let result = rdct(input)
      expect(result).toEqual(expected)
    })
    test('array of nested objects', () => {
      let input = [{foo: {bar: 'baz'}}, {foo2: {bar: 'bacon ipsum'}}]
      let expected = [{foo: {bar: '*****'}}, {foo2: {bar: 'b*********m'}}]
      let result = rdct(input)
      expect(result).toEqual(expected)
    })
    test('array of mixed types', () => {
      let input = ['foo', 1234567, {bar: 'bacon ipsum'}, false]
      let expected = ['*****', '1*****7', {bar: 'b*********m'}, '*******']
      let result = rdct(input)
      expect(result).toEqual(expected)
    })
  })
  describe('with `min` option (below default)', () => {
    let redact: Redact;
    beforeEach(() => {
      redact = input => rdct(input, {min: 3})
    })
    test('short string', () => {
      expect(redact('foo')).toEqual('f*o')
    })
    test('longer string', () => {
      expect(redact('lorem ipsum')).toEqual('l*********m')
    })
    test('whole number', () => {
      expect(redact(123)).toEqual('1*3')
    })
    test('fractional number', () => {
      expect(redact(123.456)).toEqual('1**.**6')
    })
    test('negative number', () => {
      expect(redact(-987654)).toEqual('-9****4')
    })
    test('boolean true', () => {
      expect(redact(true)).toEqual('*******')
    })
    test('boolean false', () => {
      expect(redact(false)).toEqual('*******')
    })
    test('simple objects', () => {
      let obj = {foo: 'bar', baz: 'lorem ipsum'}
      let expected = {foo: 'b*r', baz: 'l*********m'}
      let result = redact(obj)
      expect(result).toMatchObject(expected)
    })
    test('nested objects', () => {
      let obj = {foo: {bar: 'baz'}}
      let expected = {foo: {bar: 'b*z'}}
      let result = redact(obj)
      expect(result).toMatchObject(expected)
    })
    test('null', () => {
      expect(redact(null)).toEqual(null)
    })
    test('undefined', () => {
      expect(redact(void 0)).toEqual(void 0)
    })
    test('array of short strings', () => {
      expect(redact(['foo', 'bar'])).toEqual(['f*o', 'b*r'])
    })
    test('array of longer strings', () => {
      expect(redact(['lorem ipsum', 'bacon ipsum'])).toEqual([
        'l*********m',
        'b*********m'
      ])
    })
    test('array of whole numbers', () => {
      expect(redact([1234567, 9876543])).toEqual(['1*****7', '9*****3'])
    })
    test('array of fractional numbers', () => {
      expect(redact([1234.567, 987.6543])).toEqual(['1***.**7', '9**.***3'])
    })
    test('array of negative numbers', () => {
      expect(redact([-1234567, -9876543])).toEqual(['-1*****7', '-9*****3'])
    })
    test('array of boolean trues', () => {
      expect(redact([true, true])).toEqual(['*******', '*******'])
    })
    test('array of boolean falses', () => {
      expect(redact([false, false])).toEqual(['*******', '*******'])
    })
    test('array of nulls', () => {
      expect(redact([null, null])).toEqual([null, null])
    })
    test('array of undefineds', () => {
      expect(redact([void 0, void 0])).toEqual([void 0, void 0])
    })
    test('array of simple objects', () => {
      let input = [
        {foo: 'bar', baz: 'lorem ipsum'},
        {foo2: 'bar2', baz2: 'bacon ipsum'}
      ]
      let expected = [
        {foo: 'b*r', baz: 'l*********m'},
        {foo2: 'b**2', baz2: 'b*********m'}
      ]
      let result = redact(input)
      expect(result).toEqual(expected)
    })
    test('array of nested objects', () => {
      let input = [{foo: {bar: 'baz'}}, {foo2: {bar: 'bacon ipsum'}}]
      let expected = [{foo: {bar: 'b*z'}}, {foo2: {bar: 'b*********m'}}]
      let result = redact(input)
      expect(result).toEqual(expected)
    })
    test('array of mixed types', () => {
      let input = ['foo', 1234567, {bar: 'bacon ipsum'}, false]
      let expected = ['f*o', '1*****7', {bar: 'b*********m'}, '*******']
      let result = redact(input)
      expect(result).toEqual(expected)
    })
  })
  describe('with `min` option (above default)', () => {
    let redact: Redact;
    beforeEach(() => {
      redact = input => rdct(input, {min: 10})
    })
    test('short string', () => {
      expect(redact('foo')).toEqual('**********')
    })
    test('longer string', () => {
      expect(redact('lorem ipsum')).toEqual('l*********m')
    })
    test('whole number', () => {
      expect(redact(123)).toEqual('**********')
    })
    test('fractional number', () => {
      expect(redact(123.0456789)).toEqual('1**.******9')
    })
    test('negative number', () => {
      expect(redact(-9876543210)).toEqual('-9********0')
    })
    test('boolean true', () => {
      expect(redact(true)).toEqual('**********')
    })
    test('boolean false', () => {
      expect(redact(false)).toEqual('**********')
    })
    test('simple objects', () => {
      let obj = {foo: 'bar', baz: 'lorem ipsum'}
      let expected = {foo: '**********', baz: 'l*********m'}
      let result = redact(obj)
      expect(result).toMatchObject(expected)
    })
    test('nested objects', () => {
      let obj = {foo: {bar: 'baz'}}
      let expected = {foo: {bar: '**********'}}
      let result = redact(obj)
      expect(result).toMatchObject(expected)
    })
    test('null', () => {
      expect(redact(null)).toEqual(null)
    })
    test('undefined', () => {
      expect(redact(void 0)).toEqual(void 0)
    })
    test('array of short strings', () => {
      expect(redact(['foo', 'bar'])).toEqual(['**********', '**********'])
    })
    test('array of longer strings', () => {
      expect(redact(['lorem ipsum', 'bacon ipsum'])).toEqual([
        'l*********m',
        'b*********m'
      ])
    })
    test('array of whole numbers', () => {
      expect(redact([1234567, 987654321012])).toEqual([
        '**********',
        '9**********2'
      ])
    })
    test('array of fractional numbers', () => {
      expect(redact([1234.5678901, 987.6543])).toEqual([
        '1***.******1',
        '**********'
      ])
    })
    test('array of negative numbers', () => {
      expect(redact([-123, -9876543])).toEqual(['-*********', '-*********'])
    })
    test('array of boolean trues', () => {
      expect(redact([true, true])).toEqual(['**********', '**********'])
    })
    test('array of boolean falses', () => {
      expect(redact([false, false])).toEqual(['**********', '**********'])
    })
    test('array of nulls', () => {
      expect(redact([null, null])).toEqual([null, null])
    })
    test('array of undefineds', () => {
      expect(redact([void 0, void 0])).toEqual([void 0, void 0])
    })
    test('array of simple objects', () => {
      let input = [
        {foo: 'bar', baz: 'lorem ipsum'},
        {foo2: 'bar2', baz2: 'bacon ipsum'}
      ]
      let expected = [
        {foo: '**********', baz: 'l*********m'},
        {foo2: '**********', baz2: 'b*********m'}
      ]
      let result = redact(input)
      expect(result).toEqual(expected)
    })
    test('array of nested objects', () => {
      let input = [{foo: {bar: 'baz'}}, {foo2: {bar: 'bacon ipsum'}}]
      let expected = [{foo: {bar: '**********'}}, {foo2: {bar: 'b*********m'}}]
      let result = redact(input)
      expect(result).toEqual(expected)
    })
    test('array of mixed types', () => {
      let input = ['foo', 1234567, {bar: 'bacon ipsum'}, false]
      let expected = [
        '**********',
        '**********',
        {bar: 'b*********m'},
        '**********'
      ]
      let result = redact(input)
      expect(result).toEqual(expected)
    })
  })
  describe('with `includeType` option', () => {
    let redact: Redact;
    beforeEach(() => {
      redact = input => rdct(input, {includeType: true})
    })
    test('short string', () => {
      expect(redact('foo')).toEqual('***** [String]')
    })
    test('longer string', () => {
      expect(redact('lorem ipsum')).toEqual('l*********m [String]')
    })
    test('whole number', () => {
      expect(redact(123)).toEqual('***** [Number]')
    })
    test('fractional number', () => {
      expect(redact(123.456)).toEqual('1**.**6 [Number]')
    })
    test('negative number', () => {
      expect(redact(-987654)).toEqual('-9****4 [Number]')
    })
    test('boolean true', () => {
      expect(redact(true)).toEqual('******* [Boolean]')
    })
    test('boolean false', () => {
      expect(redact(false)).toEqual('******* [Boolean]')
    })
    test('simple objects', () => {
      let obj = {foo: 'bar', baz: 'lorem ipsum'}
      let expected = {foo: '***** [String]', baz: 'l*********m [String]'}
      let result = redact(obj)
      expect(result).toMatchObject(expected)
    })
    test('nested objects', () => {
      let obj = {foo: {bar: 'baz'}}
      let expected = {foo: {bar: '***** [String]'}}
      let result = redact(obj)
      expect(result).toMatchObject(expected)
    })
    test('null', () => {
      expect(redact(null)).toEqual(null)
    })
    test('undefined', () => {
      expect(redact(void 0)).toEqual(void 0)
    })
    test('array of short strings', () => {
      expect(redact(['foo', 'bar'])).toEqual([
        '***** [String]',
        '***** [String]'
      ])
    })
    test('array of longer strings', () => {
      expect(redact(['lorem ipsum', 'bacon ipsum'])).toEqual([
        'l*********m [String]',
        'b*********m [String]'
      ])
    })
    test('array of whole numbers', () => {
      expect(redact([1234567, 9876543])).toEqual([
        '1*****7 [Number]',
        '9*****3 [Number]'
      ])
    })
    test('array of fractional numbers', () => {
      expect(redact([1234.567, 987.6543])).toEqual([
        '1***.**7 [Number]',
        '9**.***3 [Number]'
      ])
    })
    test('array of negative numbers', () => {
      expect(redact([-1234567, -9876543])).toEqual([
        '-1*****7 [Number]',
        '-9*****3 [Number]'
      ])
    })
    test('array of boolean trues', () => {
      expect(redact([true, true])).toEqual([
        '******* [Boolean]',
        '******* [Boolean]'
      ])
    })
    test('array of boolean falses', () => {
      expect(redact([false, false])).toEqual([
        '******* [Boolean]',
        '******* [Boolean]'
      ])
    })
    test('array of nulls', () => {
      expect(redact([null, null])).toEqual([null, null])
    })
    test('array of undefineds', () => {
      expect(redact([void 0, void 0])).toEqual([void 0, void 0])
    })
    test('array of simple objects', () => {
      let input = [
        {foo: 'bar', baz: 'lorem ipsum'},
        {foo2: 'bar2', baz2: 'bacon ipsum'}
      ]
      let expected = [
        {foo: '***** [String]', baz: 'l*********m [String]'},
        {foo2: '***** [String]', baz2: 'b*********m [String]'}
      ]
      let result = redact(input)
      expect(result).toEqual(expected)
    })
    test('array of nested objects', () => {
      let input = [{foo: {bar: 'baz'}}, {foo2: {bar: 'bacon ipsum'}}]
      let expected = [
        {foo: {bar: '***** [String]'}},
        {foo2: {bar: 'b*********m [String]'}}
      ]
      let result = redact(input)
      expect(result).toEqual(expected)
    })
    test('array of mixed types', () => {
      let input = ['foo', 1234567, {bar: 'bacon ipsum'}, false]
      let expected = [
        '***** [String]',
        '1*****7 [Number]',
        {bar: 'b*********m [String]'},
        '******* [Boolean]'
      ]
      let result = redact(input)
      expect(result).toEqual(expected)
    })
  })
  describe('with `char` option', () => {
    let redact: Redact;
    beforeEach(() => {
      redact = input => rdct(input, {char: '?'})
    })
    test('short string', () => {
      expect(redact('foo')).toEqual('?????')
    })
    test('longer string', () => {
      expect(redact('lorem ipsum')).toEqual('l?????????m')
    })
    test('whole number', () => {
      expect(redact(123)).toEqual('?????')
    })
    test('fractional number', () => {
      expect(redact(123.456)).toEqual('1??.??6')
    })
    test('negative number', () => {
      expect(redact(-987654)).toEqual('-9????4')
    })
    test('boolean true', () => {
      expect(redact(true)).toEqual('???????')
    })
    test('boolean false', () => {
      expect(redact(false)).toEqual('???????')
    })
    test('simple objects', () => {
      let obj = {foo: 'bar', baz: 'lorem ipsum'}
      let expected = {foo: '?????', baz: 'l?????????m'}
      let result = redact(obj)
      expect(result).toMatchObject(expected)
    })
    test('nested objects', () => {
      let obj = {foo: {bar: 'baz'}}
      let expected = {foo: {bar: '?????'}}
      let result = redact(obj)
      expect(result).toMatchObject(expected)
    })
    test('null', () => {
      expect(redact(null)).toEqual(null)
    })
    test('undefined', () => {
      expect(redact(void 0)).toEqual(void 0)
    })
    test('array of short strings', () => {
      expect(redact(['foo', 'bar'])).toEqual(['?????', '?????'])
    })
    test('array of longer strings', () => {
      expect(redact(['lorem ipsum', 'bacon ipsum'])).toEqual([
        'l?????????m',
        'b?????????m'
      ])
    })
    test('array of whole numbers', () => {
      expect(redact([1234567, 9876543])).toEqual(['1?????7', '9?????3'])
    })
    test('array of fractional numbers', () => {
      expect(redact([1234.567, 987.6543])).toEqual(['1???.??7', '9??.???3'])
    })
    test('array of negative numbers', () => {
      expect(redact([-1234567, -9876543])).toEqual(['-1?????7', '-9?????3'])
    })
    test('array of boolean trues', () => {
      expect(redact([true, true])).toEqual(['???????', '???????'])
    })
    test('array of boolean falses', () => {
      expect(redact([false, false])).toEqual(['???????', '???????'])
    })
    test('array of nulls', () => {
      expect(redact([null, null])).toEqual([null, null])
    })
    test('array of undefineds', () => {
      expect(redact([void 0, void 0])).toEqual([void 0, void 0])
    })
    test('array of simple objects', () => {
      let input = [
        {foo: 'bar', baz: 'lorem ipsum'},
        {foo2: 'bar2', baz2: 'bacon ipsum'}
      ]
      let expected = [
        {foo: '?????', baz: 'l?????????m'},
        {foo2: '?????', baz2: 'b?????????m'}
      ]
      let result = redact(input)
      expect(result).toEqual(expected)
    })
    test('array of nested objects', () => {
      let input = [{foo: {bar: 'baz'}}, {foo2: {bar: 'bacon ipsum'}}]
      let expected = [{foo: {bar: '?????'}}, {foo2: {bar: 'b?????????m'}}]
      let result = redact(input)
      expect(result).toEqual(expected)
    })
    test('array of mixed types', () => {
      let input = ['foo', 1234567, {bar: 'bacon ipsum'}, false]
      let expected = ['?????', '1?????7', {bar: 'b?????????m'}, '???????']
      let result = redact(input)
      expect(result).toEqual(expected)
    })
  })
  describe('prevents abuse', () => {
    test('does not allow negative `min`', () => {
      let input = 'foo'
      let expected = 'f*o'
      let result = rdct(input, {min: -3})
      expect(result).toEqual(expected)
    })
    test.todo('could use more sanity checks')
  })
})
