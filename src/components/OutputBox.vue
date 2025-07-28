<script setup>
import { watch, computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const formula = computed(() => store.getters.getInputValue) //需要从vuex获取
// 双向绑定的计算属性
const svgCode = computed({
  get() {
    return store.getters.getSvgCode
  },
  set(value) {
    store.commit('SET_SVGCODE', value)
  },
})
const displayMode = computed({
  get() {
    return store.getters.getDisplayStyle
  },
  set(value) {
    store.commit('SET_DISPLAY_STYLE', value)
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
    svgCode.value = processSvg(tempContainer)
    //移除创建的临时容器
    document.body.removeChild(tempContainer)
    // console.log(svgCode.value)
  } catch (err) {
    console.error('MathJax 渲染错误:', err)
    svgCode.value = '' // 渲染失败时清空SVG代码
  }
}
//处理svg代码成插入微信公众平台后可以显示
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
  // 处理SVG根元素的样式
  const svgRoot = doc.querySelector('svg')
  if (svgRoot) {
    //添加样式
    const existingStyle = svgRoot.getAttribute('style') || ''
    const displayStyle = displayMode.value
      ? 'display: block; margin: 10px auto;cursor: pointer;'
      : 'display: inline;cursor: pointer;'
    if (!existingStyle.includes('display:')) {
      svgRoot.setAttribute('style', `${existingStyle}; ${displayStyle}`.trim())
    } else {
      svgRoot.setAttribute('style', existingStyle.replace(/display: [^;]+;/, displayStyle))
    }
    //添加data
    svgRoot.setAttribute('data-latex-text', `${formula.value}`)
  }
  // 将处理后的SVG转换为字符串并返回
  return new XMLSerializer().serializeToString(doc.documentElement)
}
// 监听变化并重新渲染
watch([formula, displayMode], renderMathJax)
</script>
<template>
  <div v-html="svgCode" class="SvgShowBox"></div>
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
}
label {
  font-size: 14px;
}
</style>
