export function isObject (obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

export function isArray (arr) {
  return Object.prototype.toString.call(arr) === '[object Array]'
}

export function getDom (el) {
  if (typeof el === 'string') {
    return document.querySelector(el)
  } else {
    return el
  }
}