/**
 * Deeply redact all the things
 * @param {*} obj
 * @param {Object} [options]
 * @param {bool} [options.includeType=false]
 * @param {number} [options.min=5]
 * @param {string} [options.char=*]
 */
export default function deepRedact(obj, options) {
  options = options || {}
  const type = Object.prototype.toString.call(obj).slice(8, -1)
  const min = Math.abs(options.min || 5)
  const char = options.char && options.char.length ? options.char[0] : '*'
  const typeOut = options.includeType ? ` [${type}]` : ''
  let boolRedacted = ''
  while (boolRedacted.length < 7) {
    boolRedacted += char
  }
  let minRedacted = ''
  while (minRedacted.length < min) {
    minRedacted += char
  }
  if (type === 'Object') {
    return Object.keys(obj).reduce(
      (redacted, key) =>
        Object.assign(redacted, {
          [key]: deepRedact(obj[key], options)
        }),
      {}
    )
  }
  if (type === 'Array') {
    return obj.map(o => deepRedact(o, options))
  }
  if (type === 'String') {
    if (obj.length < min) {
      return minRedacted + typeOut
    }
    return (
      obj[0] + obj.slice(1, -1).replace(/./g, char) + obj.slice(-1) + typeOut
    )
  }
  if (type === 'Number') {
    const neg = obj < 0
    let str = Math.abs(obj).toString()
    if (str.length < min) {
      return (neg ? '-' + minRedacted.slice(1) : minRedacted) + typeOut
    }
    return (
      (neg ? '-' : '') +
      str[0] +
      str.slice(1, -1).replace(/[^\.]/g, char) +
      str.slice(-1) +
      typeOut
    )
  }
  if (type === 'Boolean') {
    return (min < 8 ? boolRedacted : minRedacted) + typeOut
  }
  if (type === 'Null') {
    return null
  }
  return void 0
}
