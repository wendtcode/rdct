const chai = require('chai')
const {expect} = chai

const deepRedact = require('.')

describe('deepRedact()', () => {
  context('no options', () => {
    it('short string', () => {
      expect(deepRedact('foo')).to.equal('*****')
    })
    it('longer string', () => {
      expect(deepRedact('lorem ipsum')).to.equal('l*********m')
    })
    it('whole number', () => {
      expect(deepRedact(1234567)).to.equal('1*****7')
    })
    it('fractional number', () => {
      expect(deepRedact(123.456)).to.equal('1**.**6')
    })
    it('negative number', () => {
      expect(deepRedact(-987654)).to.equal('-9****4')
    })
    it('boolean true', () => {
      expect(deepRedact(true)).to.equal('*******')
    })
    it('boolean false', () => {
      expect(deepRedact(false)).to.equal('*******')
    })
    it('simple objects', () => {
      let obj = {foo: 'bar', baz: 'lorem ipsum'}
      let expected = {foo: '*****', baz: 'l*********m'}
      let result = deepRedact(obj)
      expect(result).to.eql(expected)
    })
    it('nested objects', () => {
      let obj = {foo: {bar: 'baz'}}
      let expected = {foo: {bar: '*****'}}
      let result = deepRedact(obj)
      expect(result).to.eql(expected)
    })
    it('null', () => {
      expect(deepRedact(null)).to.equal(null)
    })
    it('undefined', () => {
      expect(deepRedact(void 0)).to.equal(void 0)
    })
    it('array of short strings', () => {
      expect(deepRedact(['foo', 'bar'])).to.eql(['*****', '*****'])
    })
    it('array of longer strings', () => {
      expect(deepRedact(['lorem ipsum', 'bacon ipsum'])).to.eql([
        'l*********m',
        'b*********m'
      ])
    })
    it('array of whole numbers', () => {
      expect(deepRedact([1234567, 9876543])).to.eql(['1*****7', '9*****3'])
    })
    it('array of fractional numbers', () => {
      expect(deepRedact([1234.567, 987.6543])).to.eql(['1***.**7', '9**.***3'])
    })
    it('array of negative numbers', () => {
      expect(deepRedact([-1234567, -9876543])).to.eql(['-1*****7', '-9*****3'])
    })
    it('array of boolean trues', () => {
      expect(deepRedact([true, true])).to.eql(['*******', '*******'])
    })
    it('array of boolean falses', () => {
      expect(deepRedact([false, false])).to.eql(['*******', '*******'])
    })
    it('array of nulls', () => {
      expect(deepRedact([null, null])).to.eql([null, null])
    })
    it('array of undefineds', () => {
      expect(deepRedact([void 0, void 0])).to.eql([void 0, void 0])
    })
    it('array of simple objects', () => {
      let input = [
        {foo: 'bar', baz: 'lorem ipsum'},
        {foo2: 'bar2', baz2: 'bacon ipsum'}
      ]
      let expected = [
        {foo: '*****', baz: 'l*********m'},
        {foo2: '*****', baz2: 'b*********m'}
      ]
      let result = deepRedact(input)
      expect(result).to.eql(expected)
    })
    it('array of nested objects', () => {
      let input = [{foo: {bar: 'baz'}}, {foo2: {bar: 'bacon ipsum'}}]
      let expected = [{foo: {bar: '*****'}}, {foo2: {bar: 'b*********m'}}]
      let result = deepRedact(input)
      expect(result).to.eql(expected)
    })
    it('array of mixed types', () => {
      let input = ['foo', 1234567, {bar: 'bacon ipsum'}, false]
      let expected = ['*****', '1*****7', {bar: 'b*********m'}, '*******']
      let result = deepRedact(input)
      expect(result).to.eql(expected)
    })
  })
  context('with `min` option (below default)', () => {
    let redact
    beforeEach(() => {
      redact = input => deepRedact(input, {min: 3})
    })
    it('short string', () => {
      expect(redact('foo')).to.equal('f*o')
    })
    it('longer string', () => {
      expect(redact('lorem ipsum')).to.equal('l*********m')
    })
    it('whole number', () => {
      expect(redact(123)).to.equal('1*3')
    })
    it('fractional number', () => {
      expect(redact(123.456)).to.equal('1**.**6')
    })
    it('negative number', () => {
      expect(redact(-987654)).to.equal('-9****4')
    })
    it('boolean true', () => {
      expect(redact(true)).to.equal('*******')
    })
    it('boolean false', () => {
      expect(redact(false)).to.equal('*******')
    })
    it('simple objects', () => {
      let obj = {foo: 'bar', baz: 'lorem ipsum'}
      let expected = {foo: 'b*r', baz: 'l*********m'}
      let result = redact(obj)
      expect(result).to.eql(expected)
    })
    it('nested objects', () => {
      let obj = {foo: {bar: 'baz'}}
      let expected = {foo: {bar: 'b*z'}}
      let result = redact(obj)
      expect(result).to.eql(expected)
    })
    it('null', () => {
      expect(redact(null)).to.equal(null)
    })
    it('undefined', () => {
      expect(redact(void 0)).to.equal(void 0)
    })
    it('array of short strings', () => {
      expect(redact(['foo', 'bar'])).to.eql(['f*o', 'b*r'])
    })
    it('array of longer strings', () => {
      expect(redact(['lorem ipsum', 'bacon ipsum'])).to.eql([
        'l*********m',
        'b*********m'
      ])
    })
    it('array of whole numbers', () => {
      expect(redact([1234567, 9876543])).to.eql(['1*****7', '9*****3'])
    })
    it('array of fractional numbers', () => {
      expect(redact([1234.567, 987.6543])).to.eql(['1***.**7', '9**.***3'])
    })
    it('array of negative numbers', () => {
      expect(redact([-1234567, -9876543])).to.eql(['-1*****7', '-9*****3'])
    })
    it('array of boolean trues', () => {
      expect(redact([true, true])).to.eql(['*******', '*******'])
    })
    it('array of boolean falses', () => {
      expect(redact([false, false])).to.eql(['*******', '*******'])
    })
    it('array of nulls', () => {
      expect(redact([null, null])).to.eql([null, null])
    })
    it('array of undefineds', () => {
      expect(redact([void 0, void 0])).to.eql([void 0, void 0])
    })
    it('array of simple objects', () => {
      let input = [
        {foo: 'bar', baz: 'lorem ipsum'},
        {foo2: 'bar2', baz2: 'bacon ipsum'}
      ]
      let expected = [
        {foo: 'b*r', baz: 'l*********m'},
        {foo2: 'b**2', baz2: 'b*********m'}
      ]
      let result = redact(input)
      expect(result).to.eql(expected)
    })
    it('array of nested objects', () => {
      let input = [{foo: {bar: 'baz'}}, {foo2: {bar: 'bacon ipsum'}}]
      let expected = [{foo: {bar: 'b*z'}}, {foo2: {bar: 'b*********m'}}]
      let result = redact(input)
      expect(result).to.eql(expected)
    })
    it('array of mixed types', () => {
      let input = ['foo', 1234567, {bar: 'bacon ipsum'}, false]
      let expected = ['f*o', '1*****7', {bar: 'b*********m'}, '*******']
      let result = redact(input)
      expect(result).to.eql(expected)
    })
  })
  context('with `min` option (above default)', () => {
    let redact
    beforeEach(() => {
      redact = input => deepRedact(input, {min: 10})
    })
    it('short string', () => {
      expect(redact('foo')).to.equal('**********')
    })
    it('longer string', () => {
      expect(redact('lorem ipsum')).to.equal('l*********m')
    })
    it('whole number', () => {
      expect(redact(123)).to.equal('**********')
    })
    it('fractional number', () => {
      expect(redact(123.0456789)).to.equal('1**.******9')
    })
    it('negative number', () => {
      expect(redact(-9876543210)).to.equal('-9********0')
    })
    it('boolean true', () => {
      expect(redact(true)).to.equal('**********')
    })
    it('boolean false', () => {
      expect(redact(false)).to.equal('**********')
    })
    it('simple objects', () => {
      let obj = {foo: 'bar', baz: 'lorem ipsum'}
      let expected = {foo: '**********', baz: 'l*********m'}
      let result = redact(obj)
      expect(result).to.eql(expected)
    })
    it('nested objects', () => {
      let obj = {foo: {bar: 'baz'}}
      let expected = {foo: {bar: '**********'}}
      let result = redact(obj)
      expect(result).to.eql(expected)
    })
    it('null', () => {
      expect(redact(null)).to.equal(null)
    })
    it('undefined', () => {
      expect(redact(void 0)).to.equal(void 0)
    })
    it('array of short strings', () => {
      expect(redact(['foo', 'bar'])).to.eql(['**********', '**********'])
    })
    it('array of longer strings', () => {
      expect(redact(['lorem ipsum', 'bacon ipsum'])).to.eql([
        'l*********m',
        'b*********m'
      ])
    })
    it('array of whole numbers', () => {
      expect(redact([1234567, 987654321012])).to.eql([
        '**********',
        '9**********2'
      ])
    })
    it('array of fractional numbers', () => {
      expect(redact([1234.5678901, 987.6543])).to.eql([
        '1***.******1',
        '**********'
      ])
    })
    it('array of negative numbers', () => {
      expect(redact([-123, -9876543])).to.eql(['-*********', '-*********'])
    })
    it('array of boolean trues', () => {
      expect(redact([true, true])).to.eql(['**********', '**********'])
    })
    it('array of boolean falses', () => {
      expect(redact([false, false])).to.eql(['**********', '**********'])
    })
    it('array of nulls', () => {
      expect(redact([null, null])).to.eql([null, null])
    })
    it('array of undefineds', () => {
      expect(redact([void 0, void 0])).to.eql([void 0, void 0])
    })
    it('array of simple objects', () => {
      let input = [
        {foo: 'bar', baz: 'lorem ipsum'},
        {foo2: 'bar2', baz2: 'bacon ipsum'}
      ]
      let expected = [
        {foo: '**********', baz: 'l*********m'},
        {foo2: '**********', baz2: 'b*********m'}
      ]
      let result = redact(input)
      expect(result).to.eql(expected)
    })
    it('array of nested objects', () => {
      let input = [{foo: {bar: 'baz'}}, {foo2: {bar: 'bacon ipsum'}}]
      let expected = [{foo: {bar: '**********'}}, {foo2: {bar: 'b*********m'}}]
      let result = redact(input)
      expect(result).to.eql(expected)
    })
    it('array of mixed types', () => {
      let input = ['foo', 1234567, {bar: 'bacon ipsum'}, false]
      let expected = [
        '**********',
        '**********',
        {bar: 'b*********m'},
        '**********'
      ]
      let result = redact(input)
      expect(result).to.eql(expected)
    })
  })
  context('with `includeType` option', () => {
    let redact
    beforeEach(() => {
      redact = input => deepRedact(input, {includeType: true})
    })
    it('short string', () => {
      expect(redact('foo')).to.equal('***** [String]')
    })
    it('longer string', () => {
      expect(redact('lorem ipsum')).to.equal('l*********m [String]')
    })
    it('whole number', () => {
      expect(redact(123)).to.equal('***** [Number]')
    })
    it('fractional number', () => {
      expect(redact(123.456)).to.equal('1**.**6 [Number]')
    })
    it('negative number', () => {
      expect(redact(-987654)).to.equal('-9****4 [Number]')
    })
    it('boolean true', () => {
      expect(redact(true)).to.equal('******* [Boolean]')
    })
    it('boolean false', () => {
      expect(redact(false)).to.equal('******* [Boolean]')
    })
    it('simple objects', () => {
      let obj = {foo: 'bar', baz: 'lorem ipsum'}
      let expected = {foo: '***** [String]', baz: 'l*********m [String]'}
      let result = redact(obj)
      expect(result).to.eql(expected)
    })
    it('nested objects', () => {
      let obj = {foo: {bar: 'baz'}}
      let expected = {foo: {bar: '***** [String]'}}
      let result = redact(obj)
      expect(result).to.eql(expected)
    })
    it('null', () => {
      expect(redact(null)).to.equal(null)
    })
    it('undefined', () => {
      expect(redact(void 0)).to.equal(void 0)
    })
    it('array of short strings', () => {
      expect(redact(['foo', 'bar'])).to.eql([
        '***** [String]',
        '***** [String]'
      ])
    })
    it('array of longer strings', () => {
      expect(redact(['lorem ipsum', 'bacon ipsum'])).to.eql([
        'l*********m [String]',
        'b*********m [String]'
      ])
    })
    it('array of whole numbers', () => {
      expect(redact([1234567, 9876543])).to.eql([
        '1*****7 [Number]',
        '9*****3 [Number]'
      ])
    })
    it('array of fractional numbers', () => {
      expect(redact([1234.567, 987.6543])).to.eql([
        '1***.**7 [Number]',
        '9**.***3 [Number]'
      ])
    })
    it('array of negative numbers', () => {
      expect(redact([-1234567, -9876543])).to.eql([
        '-1*****7 [Number]',
        '-9*****3 [Number]'
      ])
    })
    it('array of boolean trues', () => {
      expect(redact([true, true])).to.eql([
        '******* [Boolean]',
        '******* [Boolean]'
      ])
    })
    it('array of boolean falses', () => {
      expect(redact([false, false])).to.eql([
        '******* [Boolean]',
        '******* [Boolean]'
      ])
    })
    it('array of nulls', () => {
      expect(redact([null, null])).to.eql([null, null])
    })
    it('array of undefineds', () => {
      expect(redact([void 0, void 0])).to.eql([void 0, void 0])
    })
    it('array of simple objects', () => {
      let input = [
        {foo: 'bar', baz: 'lorem ipsum'},
        {foo2: 'bar2', baz2: 'bacon ipsum'}
      ]
      let expected = [
        {foo: '***** [String]', baz: 'l*********m [String]'},
        {foo2: '***** [String]', baz2: 'b*********m [String]'}
      ]
      let result = redact(input)
      expect(result).to.eql(expected)
    })
    it('array of nested objects', () => {
      let input = [{foo: {bar: 'baz'}}, {foo2: {bar: 'bacon ipsum'}}]
      let expected = [
        {foo: {bar: '***** [String]'}},
        {foo2: {bar: 'b*********m [String]'}}
      ]
      let result = redact(input)
      expect(result).to.eql(expected)
    })
    it('array of mixed types', () => {
      let input = ['foo', 1234567, {bar: 'bacon ipsum'}, false]
      let expected = [
        '***** [String]',
        '1*****7 [Number]',
        {bar: 'b*********m [String]'},
        '******* [Boolean]'
      ]
      let result = redact(input)
      expect(result).to.eql(expected)
    })
  })
  context('with `char` option', () => {
    let redact
    beforeEach(() => {
      redact = input => deepRedact(input, {char: '?'})
    })
    it('short string', () => {
      expect(redact('foo')).to.equal('?????')
    })
    it('longer string', () => {
      expect(redact('lorem ipsum')).to.equal('l?????????m')
    })
    it('whole number', () => {
      expect(redact(123)).to.equal('?????')
    })
    it('fractional number', () => {
      expect(redact(123.456)).to.equal('1??.??6')
    })
    it('negative number', () => {
      expect(redact(-987654)).to.equal('-9????4')
    })
    it('boolean true', () => {
      expect(redact(true)).to.equal('???????')
    })
    it('boolean false', () => {
      expect(redact(false)).to.equal('???????')
    })
    it('simple objects', () => {
      let obj = {foo: 'bar', baz: 'lorem ipsum'}
      let expected = {foo: '?????', baz: 'l?????????m'}
      let result = redact(obj)
      expect(result).to.eql(expected)
    })
    it('nested objects', () => {
      let obj = {foo: {bar: 'baz'}}
      let expected = {foo: {bar: '?????'}}
      let result = redact(obj)
      expect(result).to.eql(expected)
    })
    it('null', () => {
      expect(redact(null)).to.equal(null)
    })
    it('undefined', () => {
      expect(redact(void 0)).to.equal(void 0)
    })
    it('array of short strings', () => {
      expect(redact(['foo', 'bar'])).to.eql(['?????', '?????'])
    })
    it('array of longer strings', () => {
      expect(redact(['lorem ipsum', 'bacon ipsum'])).to.eql([
        'l?????????m',
        'b?????????m'
      ])
    })
    it('array of whole numbers', () => {
      expect(redact([1234567, 9876543])).to.eql(['1?????7', '9?????3'])
    })
    it('array of fractional numbers', () => {
      expect(redact([1234.567, 987.6543])).to.eql(['1???.??7', '9??.???3'])
    })
    it('array of negative numbers', () => {
      expect(redact([-1234567, -9876543])).to.eql(['-1?????7', '-9?????3'])
    })
    it('array of boolean trues', () => {
      expect(redact([true, true])).to.eql(['???????', '???????'])
    })
    it('array of boolean falses', () => {
      expect(redact([false, false])).to.eql(['???????', '???????'])
    })
    it('array of nulls', () => {
      expect(redact([null, null])).to.eql([null, null])
    })
    it('array of undefineds', () => {
      expect(redact([void 0, void 0])).to.eql([void 0, void 0])
    })
    it('array of simple objects', () => {
      let input = [
        {foo: 'bar', baz: 'lorem ipsum'},
        {foo2: 'bar2', baz2: 'bacon ipsum'}
      ]
      let expected = [
        {foo: '?????', baz: 'l?????????m'},
        {foo2: '?????', baz2: 'b?????????m'}
      ]
      let result = redact(input)
      expect(result).to.eql(expected)
    })
    it('array of nested objects', () => {
      let input = [{foo: {bar: 'baz'}}, {foo2: {bar: 'bacon ipsum'}}]
      let expected = [{foo: {bar: '?????'}}, {foo2: {bar: 'b?????????m'}}]
      let result = redact(input)
      expect(result).to.eql(expected)
    })
    it('array of mixed types', () => {
      let input = ['foo', 1234567, {bar: 'bacon ipsum'}, false]
      let expected = ['?????', '1?????7', {bar: 'b?????????m'}, '???????']
      let result = redact(input)
      expect(result).to.eql(expected)
    })
  })
  context('prevents abuse', () => {
    it('does not allow negative `min`', () => {
      let input = 'foo'
      let expected = 'f*o'
      let result = deepRedact(input, {min: -3})
      expect(result).to.equal(expected)
    })
    xit('could use more sanity checks')
  })
})
