<script setup>
import { watch, computed } from 'vue'
import { useStore } from 'vuex'
import ColorPicker from './ColorPicker.vue'
const store = useStore()
//输入框的输入内容
const formula = computed(() => store.getters.getInputValue)
//输出框的输出svg
const svgCode = computed({
  get() {
    return store.getters.getSvgCode
  },
  set(value) {
    store.commit('SET_SVGCODE', value)
  },
})
// svg字体大小
const fontSize = computed({
  get() {
    return store.getters.getSvgFontSize
  },
  set(value) {
    store.commit('SET_SVGFONTSIZE', value)
  },
})
// svg字体颜色
const fontColor = computed(() => store.getters.getSvgColor)
// svg背景颜色
const bgColor = computed(() => store.getters.getSvgBgColor)
const displayMode = computed({
  get() {
    return store.getters.getSvgDisplayMode
  },
  set(value) {
    store.commit('SET_SVGDISPLAYMODE', value)
  },
})
// // 渲染MathJax
const renderMathJax = async () => {
  if (!window.MathJax) {
    return
  }
  try {
    // 配置MathJax
    if (!window.MathJax.isConfigured) {
      window.MathJax = {
        ...window.MathJax,
        tex: {
          processEscapes: true,
        },
        svg: {
          fontCache: 'global',
        },
        isConfigured: true,
      }
    }
    // 创建不可见的临时容器
    const tempContainer = document.createElement('div')
    tempContainer.style.position = 'absolute'
    tempContainer.style.visibility = 'hidden'
    tempContainer.style.width = '0'
    tempContainer.style.height = '0'
    //临时加入到body 不然svg的viewbox会有参数NaN
    document.body.appendChild(tempContainer)
    // 设置公式内容 \\[ 是tex形式
    tempContainer.innerHTML = `\\[ ${formula.value} \\]`
    // MathJax渲染公式生成svg
    await window.MathJax.typesetPromise([tempContainer])
    //处理MathJax生成的svg
    processSvg(tempContainer)
    //对svg修改样式
    processSvgStyles()
    //移除创建的临时容器
    document.body.removeChild(tempContainer)
  } catch (err) {
    console.error('MathJax 渲染错误:', err)
    svgCode.value = '' // 渲染失败时清空SVG代码
  }
}
// 处理svg代码成插入微信公众平台后可以显示
const processSvg = (tempContainer) => {
  if (!tempContainer) return ''
  const svgElement = tempContainer.querySelector('svg')
  if (!svgElement) return ''
  // 清理SVG元素，移除不必要的属性
  const cleanSvg = svgElement.cloneNode(true)
  cleanSvg.removeAttribute('aria-hidden')
  cleanSvg.removeAttribute('role')
  // 移除MathJax添加的类
  Array.from(cleanSvg.querySelectorAll('[class^="mjx-"]')).forEach((el) => {
    el.removeAttribute('class')
  })
  // 序列化SVG为字符串
  let svgText = new XMLSerializer().serializeToString(cleanSvg)
  // 创建临时DOM解析器
  const parser = new DOMParser()
  const doc = parser.parseFromString(svgText, 'image/svg+xml')
  // 收集defs中的所有path映射（id -> d属性）
  const pathMap = new Map()
  const defs = doc.querySelector('defs')
  if (defs) {
    const paths = defs.querySelectorAll('path')
    paths.forEach((path) => {
      const id = path.getAttribute('id')
      const d = path.getAttribute('d')
      if (id && d) {
        pathMap.set(id, d)
      }
    })
    // 删除defs标签
    defs.remove()
  }
  // 处理所有use标签，替换为path标签
  const useElements = doc.querySelectorAll('use')
  useElements.forEach((use) => {
    const href = use.getAttribute('xlink:href') || use.getAttribute('href')
    if (!href) return
    const targetId = href.startsWith('#') ? href.slice(1) : href
    const d = pathMap.get(targetId)
    if (!d) return
    const newPath = doc.createElementNS('http://www.w3.org/2000/svg', 'path')
    Array.from(use.attributes).forEach((attr) => {
      const name = attr.name
      if (!name.startsWith('xmlns:xlink') && name !== 'xlink:href' && name !== 'href') {
        newPath.setAttribute(name, attr.value)
      }
    })
    newPath.setAttribute('d', d)
    use.parentNode.replaceChild(newPath, use)
  })
  const svgRoot = doc.querySelector('svg')
  if (!svgRoot) return
  svgRoot.setAttribute('data-latex-text', formula.value)
  svgCode.value = new XMLSerializer().serializeToString(doc.documentElement)
}
//处理svg代码的样式
const processSvgStyles = () => {
  if (!svgCode.value) return
  const parser = new DOMParser()
  const doc = parser.parseFromString(svgCode.value, 'image/svg+xml')
  const svgRoot = doc.querySelector('svg')
  if (!svgRoot) return
  svgRoot.setAttribute('data-latex-fontsize', fontSize.value)
  svgRoot.setAttribute('data-latex-bgcolor', bgColor.value)
  svgRoot.setAttribute('data-latex-fontcolor', fontColor.value)
  svgRoot.setAttribute('data-latex-display', displayMode.value)
  // 1. 获取现有样式并拆分为键值对（去重）
  const existingStyle = svgRoot.getAttribute('style') || ''
  const styleMap = new Map()
  // 拆分样式为数组（处理分号和空格）
  const styleEntries = existingStyle
    .split(';')
    .map((item) => item.trim())
    .filter((item) => item)
  // 解析为键值对并存入Map
  styleEntries.forEach((entry) => {
    const [key, value] = entry.split(':').map((item) => item.trim())
    if (key && value) {
      styleMap.set(key, value)
    }
  })
  // 2. 覆盖/添加必要样式
  // display样式
  const displayValue = displayMode.value ? 'block' : 'inline'
  styleMap.set('display', displayValue)

  //处理字体大小的非法输入
  handleFontSizeChange()
  // 其他响应式样式（覆盖现有值）
  styleMap.set('font-size', `${fontSize.value}px`)
  styleMap.set('color', fontColor.value)
  styleMap.set('background-color', bgColor.value)
  // 固定样式
  styleMap.set('cursor', 'pointer')
  if (displayMode.value) {
    // 仅block模式下添加margin
    styleMap.set('margin', '10px auto')
  } else {
    // inline模式下移除margin
    styleMap.delete('margin')
  }
  // 3. 合并为规范的样式字符串
  const cleanedStyles = Array.from(styleMap.entries())
    .map(([key, value]) => `${key}: ${value}`)
    .join('; ')
  // 4. 更新SVG样式
  svgRoot.setAttribute('style', cleanedStyles)
  // 5. 序列化回字符串
  svgCode.value = new XMLSerializer().serializeToString(doc.documentElement)
}
//处理svg字体大小的非法输入，确保值为10-50之间的有效数字
const handleFontSizeChange = () => {
  // 1. 移除所有非数字字符（只保留数字）
  const numericValue = fontSize.value.replace(/[^0-9]/g, '')
  // 2. 验证是否为有效数字
  if (!numericValue) {
    fontSize.value = 10
    return
  }
  // 3. 转换为数字并验证范围（10-50）
  const num = parseInt(numericValue, 10)
  if (isNaN(num)) {
    fontSize.value = 10
    return
  }
  // 4. 限制范围在10-50之间
  const clampedValue = Math.max(10, Math.min(50, num))
  // 5. 只有当值变化时才更新
  if (clampedValue !== parseInt(fontSize.value, 10)) {
    fontSize.value = clampedValue.toString()
  }
}
watch([fontColor, bgColor, displayMode], processSvgStyles)
watch([formula], renderMathJax)
</script>
<template>
  <div v-html="svgCode" class="SvgShowBox"></div>
  <ColorPicker :colorTitle="'A'" :isBgColor="false"></ColorPicker>
  <ColorPicker :colorTitle="'ab'" :isBgColor="true"></ColorPicker>
  <input
    type="text"
    v-model="fontSize"
    class="fontSize"
    @blur="processSvgStyles()"
    :title="`字体大小:${fontSize}px`"
  />
  <label>
    <input type="checkbox" v-model="displayMode" />
    行间公式
  </label>
</template>
<style scoped lang="less">
.SvgShowBox {
  overflow: auto;
  margin: 10px 0;
  height: 80px;
  width: 280px;
  // 滚动条样式
  &::-webkit-scrollbar {
    width: 5px;
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f5f5f5;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: #d1d1d1;
    border-radius: 3px;

    &:hover {
      background: #a8a8a8;
    }
  }
}
label {
  input {
    margin: 0 0 0 3px;
    height: 10px;
  }
  font-size: 14px;
}
.fontSize {
  border-radius: 4px;
  border: 1px solid rgb(221, 221, 221);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  margin-left: 3px;
  width: 26px;
  height: 26px;
  font-size: 14px;
}
span {
  padding: 0 2px;
  font-size: 14px;
}
</style>
