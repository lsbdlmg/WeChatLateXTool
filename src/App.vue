<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import OutputBox from './components/OutputBox.vue'
import InputBox from './components/InputBox.vue'
import ShowButton from './components/ShowButton.vue'
import InsertButton from './components/InsertButton.vue'
import CancelButton from './components/CancelButton.vue'
const store = useStore()
const isShowLateX = ref(false)
//设置监听主页面的双击事件
const setupDoubleClickListener = () => {
  // 监听主页面的双击事件
  const handleMainPageDblClick = (event) => {
    // 检查点击的元素是否带有data-latex-text属性
    const targetElement = event.target.closest('[data-latex-text]')
    if (targetElement) {
      // 获取属性值
      const latexText = targetElement.getAttribute('data-latex-text')
      store.commit('SET_INPUT_VALUE', latexText)
      isShowLateX.value = true
    }
  }
  // 绑定主页面的dblclick事件
  window.parent.document.addEventListener('dblclick', handleMainPageDblClick)
  // 组件卸载时移除监听（避免内存泄漏）
  return () => {
    window.parent.document.removeEventListener('dblclick', handleMainPageDblClick)
  }
}
//初始化
onMounted(() => {
  const removeListener = setupDoubleClickListener()
  onUnmounted(removeListener) //卸载时清理
})
</script>
<template>
  <ShowButton @click="isShowLateX = !isShowLateX"></ShowButton>
  <div id="LatexTool">
    <div v-show="isShowLateX" class="ShowLateX">
      <InputBox></InputBox>
      <OutputBox></OutputBox>
      <InsertButton class="InsertButton"></InsertButton>
      <CancelButton class="CancelButton" @click="isShowLateX = false"></CancelButton>
    </div>
  </div>
</template>
<style scoped lang="less">
#LatexTool {
  position: fixed;
  left: 10px;
  width: 280px;
  background: #ececec;
  overflow-y: auto;
  .ShowLateX {
    margin: 0 5px;
    .CancelButton {
      position: relative;
      right: -107px;
      bottom: 0;
    }
    .InsertButton {
      position: relative;
      right: -105px;
      bottom: 0;
    }
  }
}
</style>
