<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import OutputBox from './components/OutputBox.vue'
import InputBox from './components/InputBox.vue'
import ShowButton from './components/ShowButton.vue'
const isShowLateX = ref(false)
const store = useStore()
const svgCode = computed(() => store.getters.getSvgCode)
const insertSvg = () => {
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
  <ShowButton @click="isShowLateX = !isShowLateX" :title="'公式'"></ShowButton>
  <div id="LatexTool">
    <div v-show="isShowLateX" class="ShowLateX">
      <InputBox></InputBox>
      <OutputBox></OutputBox>
      <ShowButton :title="'插入'" @click="insertSvg"></ShowButton>
    </div>
  </div>
</template>
<style scoped lang="less">
#LatexTool {
  position: fixed;
  left: 0;
  width: 100%;
  background: #ffffff;
  .ShowLateX {
    margin: 10px;
  }
}
</style>
