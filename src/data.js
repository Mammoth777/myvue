import {
  isObject,
  isArray
} from './utils.js'

/**
 * 把对象做成代理对象
 * 目前， 数组不能被proxy对象响应
 * @param {Object} obj 被监听对象
 */
const observify = function (obj) {
  // 代理数组
  if (isArray(obj)) {
    return defineReactive(obj)
  }
  // 非对象， 直接返回
  if (!isObject(obj)) {
    return obj
  }

  // 深度监听
  Object.keys(obj).forEach(key => {
    // 递归对象
    obj[key] = observify(obj[key])
  })


  return defineReactive(obj)
}

/**
 * 设置数据响应
 */
function defineReactive(obj) {
  return new Proxy(obj, {
    get(target, key) {
      console.log('get ' + key)
      return target[key]
    },
    set(target, key, value) {
      console.log('set ' + key + ' : ' + value)
      target[key] = value
      return true
    }
  })
}

export default observify

// export default class Watcher {

// }