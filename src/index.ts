interface RedactOptions {
  min?: number;
  char?: string;
  includeType?: boolean;
}

interface Obj<T> {
  [key: string]: T;
}

export type ValidType = Obj<ValidType> | Array<ValidType> | boolean | number | string | null | undefined;

function isUndefined(obj: any): obj is undefined {
  return obj === undefined;
}

function isNull(obj: any): obj is null {
  return obj === null;
}

function isBoolean(obj: any): obj is boolean {
  return Object.prototype.toString.call(obj).slice(8, -1) === 'Boolean'
}

function isNumber(obj: any): obj is number {
  return Object.prototype.toString.call(obj).slice(8, -1) === 'Number' && !isNaN(obj)
}

function isString(obj: any): obj is string {
  return Object.prototype.toString.call(obj).slice(8, -1) === 'String';
}

function isArray(obj: any): obj is Array<ValidType> {
  return Array.isArray(obj) && obj.every(isValidType)
}

function isObject(obj: any): obj is Obj<ValidType> {
  return Object.prototype.toString.call(obj).slice(8, -1) === 'Object' && Object.keys(obj).every(key => isValidType(obj[key]))
}

function isValidType(obj: any): obj is ValidType {
  return [isUndefined, isNull, isBoolean, isNumber, isString, isArray, isObject].some(fn => fn(obj))
}

export type Redact = (obj: ValidType, options?: RedactOptions) => Obj<ValidType> | Array<ValidType> | string | null | undefined;

const rdct: Redact = (obj, options = {}) => {
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
  if (isUndefined(obj)) {
    return void 0;
  }
  if (isNull(obj)) {
    return null
  }
  if (isBoolean(obj)) {
    return (min < 8 ? boolRedacted : minRedacted) + typeOut
  }
  if (isNumber(obj)) {
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
  if (isObject(obj)) {
    return Object.keys(obj).reduce(
      (redacted, key) =>
        Object.assign(redacted, {
          [key]: rdct(obj[key], options)
        }),
      {}
    )
  }
  if (isArray(obj)) {
    return obj.map(o => rdct(o, options))
  }
  if (isString(obj)) {
    if (obj.length < min) {
      return minRedacted + typeOut
    }
    return (
      obj[0] + obj.slice(1, -1).replace(/./g, char) + obj.slice(-1) + typeOut
    )
  }
  
  return void 0
}

export default rdct;
