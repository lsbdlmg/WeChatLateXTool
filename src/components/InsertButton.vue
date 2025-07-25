<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const svgCode = computed(() => store.getters.getSvgCode)
const displayStyle = computed(() => store.getters.getDisplayStyle)
//光标处分离文本并插入svg
const splitAndInsertAtCursor = () => {
  if (!svgCode.value) {
    window.parent.alert('请输入公式')
    return
  }
  try {
    // 获取编辑框
    const editableElement = window.parent.document.querySelector('.mock-iframe .ProseMirror')
    if (!editableElement) {
      console.error('未找到编辑框: .mock-iframe .ProseMirror')
      return
    }
    // 获取主页面的Selection和Range对象
    const selection = window.parent.document.getSelection()
    if (!selection.rangeCount) {
      return
    }
    const range = selection.getRangeAt(0)
    // 1. 检查光标是否在<span leaf>元素内部
    let leafSpan = range.commonAncestorContainer
    // 如果是文本节点，向上查找父级span
    if (leafSpan.nodeType === 3) {
      leafSpan = leafSpan.parentElement
    }
    // 验证是否为目标span元素
    if (!leafSpan || leafSpan.tagName !== 'SPAN' || !leafSpan.hasAttribute('leaf')) {
      window.parent.alert('请在正文光标处输入文本，以确认插入位置')
      return
    }
    // 2. 获取光标在span中的偏移量
    let textOffset = 0
    let containerNode = range.startContainer
    // 如果光标在文本节点内
    if (containerNode.nodeType === 3) {
      textOffset = range.startOffset
    } else {
      // 如果光标在元素内，计算其在文本内容中的位置
      const walker = window.parent.document.createTreeWalker(
        leafSpan,
        NodeFilter.SHOW_TEXT,
        null,
        false,
      )
      let charCount = 0
      while (walker.nextNode()) {
        if (walker.currentNode === containerNode) {
          textOffset = charCount + range.startOffset
          break
        }
        charCount += walker.currentNode.length
      }
    }
    // 3. 分割span内容并插入新元素
    const originalText = leafSpan.textContent
    const textBefore = originalText.substring(0, textOffset)
    const textAfter = originalText.substring(textOffset)
    //紧跟文本是span 并且前后加上空格
    if (!displayStyle.value) {
      // 创建新的span元素（前半部分）
      const spanBefore = window.parent.document.createElement('span')
      spanBefore.setAttribute('leaf', '')
      spanBefore.textContent = textBefore
      // 创建新的span元素（插入svg）
      const newSpan = window.parent.document.createElement('span')
      newSpan.innerHTML = '&nbsp;' + svgCode.value + '&nbsp;'
      // 创建新的span元素（后半部分）
      const spanAfter = window.parent.document.createElement('span')
      spanAfter.setAttribute('leaf', '')
      spanAfter.textContent = textAfter
      // 替换原span元素
      leafSpan.parentNode.replaceChild(spanBefore, leafSpan)
      spanBefore.parentNode.insertBefore(newSpan, spanBefore.nextSibling)
      spanBefore.parentNode.insertBefore(spanAfter, newSpan.nextSibling)
    } // 行间换成section 并且后面新添一个段落
    else {
      // 创建新的span元素（前半部分）
      const spanBefore = window.parent.document.createElement('span')
      spanBefore.setAttribute('leaf', '')
      spanBefore.textContent = textBefore
      // 创建新的span元素（插入svg）
      const newSectionSvg = window.parent.document.createElement('section')
      const newSpan = window.parent.document.createElement('span')
      newSpan.innerHTML = svgCode.value
      newSectionSvg.appendChild(newSpan)
      // 创建新的span元素（后半部分）
      const SectionAfter = window.parent.document.createElement('section')
      const spanAfter = window.parent.document.createElement('span')
      spanAfter.setAttribute('leaf', '')
      spanAfter.textContent = textAfter
      SectionAfter.appendChild(spanAfter)
      // 替换原span元素
      leafSpan.parentNode.replaceChild(spanBefore, leafSpan)
      //spanBefore.parentNode后添加兄弟节点
      spanBefore.parentNode.after(newSectionSvg)
      newSectionSvg.after(SectionAfter)
    }
  } catch (error) {
    console.error('分割并插入元素失败:', error)
    return
  }
}
</script>
<template>
  <button @click="splitAndInsertAtCursor()">插入</button>
</template>
<style scoped lang="less">
button {
  margin-left: 1px;
  padding: 5px;
  border: 1px solid rgb(205, 205, 252);
  font-weight: 700;
  font-size: 14px;
  background: #fc6d00;
  color: #ffffff;
  border-radius: 5px;
  transition: background 0.3s ease;
  cursor: pointer;
  &:hover {
    background: #fd480b;
  }
  &:active {
    background: #fc3f00;
  }
}
</style>
