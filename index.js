/**
 * Deeply redact things
 * @param obj
 * @returns {*}
 */
export default function deepRedact(obj) {
  const type = Object.prototype.toString.call(obj).slice(8, -1)
  if (type === 'Object') {
    return Object.keys(obj).reduce(
      (redacted, k) =>
        Object.assign(redacted, {
          [k]: deepRedact(obj[k])
        }),
      {}
    )
  }
  if (type === 'Array') {
    return obj.map(deepRedact)
  }
  if (type === 'String' || type === 'Number') {
    const str = '' + obj
    return str.length < 3
      ? `${str.replace(/./g, '*')} [${type}]`
      : `${str[0]}${str.slice(1, -1).replace(/./g, '*')}${str.slice(
          -1
        )} [${type}]`
  }
  if (type === 'Boolean') {
    return `${type.replace(/./g, '*')} [${type}]`
  }
  if (type === 'Null') {
    return null
  }
  return void 0
}
