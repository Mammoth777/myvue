import { getDom } from './utils.js';
import { Watcher } from './Watcher.js';

class Compile {
  constructor(el, vm) {
    this.vm = vm
    const element = getDom(el)
    this.compile(element)
  }

  compile (element) {
    Array.from(element.childNodes).forEach(node => {
      // 文字节点
      if (node.nodeType === 3) {
        this.textCompile(node)
        // 元素节点
      } else if (node.nodeType === 1) {
        this.compile(node)
      }
    })
  }  
  // 编译文本节点， 抽出插值表达式及指令， 订阅该变量变化
  // todo 解析指令
  // done TODO 获取文本所有插值
  textCompile (node) {
    const text = node.textContent
    // const reg = /(?<outer>{{\s*(?<inner>\w+(\.\w+)*)\s*}})/
    const reg = /(?<outer>{{\s*(?<inner>\S+)\s*}})/
    let index = 0
    let match = text.substr(index).match(reg)
    // eslint-disable-next-line no-cond-assign
    while (match) {
      // 解析插值
      const interpolation = match.groups.outer
      const interText = match.groups.inner
      new Watcher(this.vm, interText, (newVal, oldVal) => {
        console.log('watcher cb 。。。')
        console.log({newVal, oldVal})
        node.textContent = node.textContent.replace(interpolation, newVal)
      })

      index += match.index + match.groups.outer.length
      match = text.substr(index).match(reg)
    }
  }
}



export default Compile
