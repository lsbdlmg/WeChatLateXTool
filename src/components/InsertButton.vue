<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
defineProps({
  title: String,
})
const store = useStore()
const svgCode = computed(() => store.getters.getSvgCode)
const insertSvg = () => {
  if (!svgCode.value) {
    alert('请输入公式')
    return
  }
  try {
    // 从主页面获取目标元素
    const targetElement = window.parent.document.querySelector('.mock-iframe .ProseMirror')
    // 检查元素是否存在
    if (!targetElement) {
      console.error('未找到目标元素 .mock-iframe .ProseMirror')
      return
    }
    // 创建新元素
    const newSection = window.parent.document.createElement('section')
    newSection.innerHTML = svgCode.value
    // 将新元素添加到目标元素
    targetElement.appendChild(newSection)
    console.log('成功插入元素到主页面')
  } catch (error) {
    console.error('插入元素时出错:', error)
  }
}
</script>
<template>
  <button @click="insertSvg">{{ title }}</button>
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
