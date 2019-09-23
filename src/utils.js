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

/**
 * 取出嵌套对象的值， obj['这样的']['这样的']
 * @param {object} data
 * @param {string} express
 */
export function getNestedValue(data, express) {
  let temp
  eval(`temp = data.${express}`)
  return temp
}

/**
 * 设置深层值
 * @param {object} data
 * @param {string} express 表达式
 * @param {any} newVal
 */
export function setNestedValue(data, express, newVal) {
  eval(`data.${express}=${newVal}`)
}