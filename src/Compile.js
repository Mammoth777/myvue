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
  // 编译文本节点， 抽出插值表达式， 订阅该变量变化
  textCompile (node) {
    const text = node.textContent
    if (/({{\s*(\w+)\s*}})/.test(text)) {
      // TODO 获取文本所有插值
      const interpolation = RegExp.$1 // {{ hello }}
      const interText = RegExp.$2 // hello  插值内容
      new Watcher(this.vm, interpolation, (newVal, oldVal) => {
        console.log('watcher cb 。。。')
      })
    }

  }
}



export default Compile
