import obserify from './Observer.js'
import Compile from './Compile.js'

export default class Vue {
  /**
   * 1. 代理data里的数据
   * 2. 解析html指令
   * @param {object} options 初始化参数
   */
  constructor (options) {
    this.el = options.el
    // 1. 代理数据
    this.data = obserify(options.data)
    // 2. 解析模版
    new Compile(this.el, this) // 解析当前实例， 渲染
  }
}
