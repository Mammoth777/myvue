import { getNestedValue } from "./utils.js"

/**
 * Dependency 依赖收集【发布订阅模式】
 * > Dep作为被观察者， 可以被多个指令订阅
 * >
 * > 名词理解: watcher === subscriber 观察者， 订阅者， 被通知更新
 *  - subs: subscribers, 订阅者列表
 *  - notify -> 提醒所有订阅着更新
 *  - addSub -> 增加一个subscribe(订阅)
 *  - removeSub -> 移除一个subscribe
 */
export class Dep {
  constructor () {
    this.subs = []
  }
  addSub (watcher) {
    this.subs.push(watcher)
  }

  /**
   * 发布， 通知每一个订阅者更新
   */
  notify () {
    console.log('notify')
    this.subs.forEach(watcher => {
      watcher.update()
    })
  }
}
Dep.target = null // 留个地方，用于存储watch实例

/**
 * 观察者/订阅者/被通知更新
 * > 一个Watcher解析一个表达式， 收集依赖，响应数据变化后的回调
 */
export class Watcher {
  /**
   * 观察者构造器
   * @param {object} vm 被监听对象， 此处应该是vm被监听
   * @param {string} attr 被监听的属性
   * @param {function} cb 属性改变后的回调
   */
  constructor (vm, attr, cb) {
    this.vm = vm
    this.attr = attr
    this.cb = cb
    Dep.target = this
    // this.oldVal = vm.data[attr] // 走了vm[attr]的get， 会自动触发dep.addSub
    this.oldVal = getNestedValue(vm.data, attr) // 假如attr是一个表达式， 那么就执行一波
    Dep.target = null
  }
  /**
   * 更新数据后的回调
   */
  update () {
    console.log('watcher update')
    // todo： 这里如果是引用数据类型，岂不是oldVal和newVal一毛一样， 那咋处理啊。。。
    let oldVal = this.oldVal
    // let newVal = this.vm.data[this.attr]
    let newVal = getNestedValue(this.vm.data, this.attr)
    this.cb(newVal, oldVal)
  }
}