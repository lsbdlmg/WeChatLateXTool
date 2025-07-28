<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useStore } from 'vuex'
import { Symbols } from './data/Symbols'
import OutputBox from './components/OutputBox.vue'
import InputBox from './components/InputBox.vue'
import ShowButton from './components/ShowButton.vue'
import InsertButton from './components/InsertButton.vue'
import CancelButton from './components/CancelButton.vue'
import ShortCutTool from './components/ShortCutTool.vue'
const store = useStore()
const isShowLateX = ref(false)
//设置监听主页面的双击事件，对已有公式双击编辑时使用
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
//动态调整iframe的宽高（不然会挡住主页面）
const setupIframeStyle = () => {
  const LateXiframe = window.parent.document.querySelector('#vue-note-container')
  if (isShowLateX.value) {
    LateXiframe.style.width = '300px'
    LateXiframe.style.height = '600px'
  } else {
    LateXiframe.style.width = '80px'
    LateXiframe.style.height = '50px'
  }
}
//根据主应用是否显示来动态调整
watch(isShowLateX, setupIframeStyle)
//初始化时就监听主页面的双击事件
onMounted(() => {
  const removeListener = setupDoubleClickListener()
  onUnmounted(removeListener) //卸载时清理
})
</script>
<template>
  <!-- 打开工具按钮 -->
  <ShowButton @click="isShowLateX = !isShowLateX"></ShowButton>
  <!-- 主应用 -->
  <div id="LatexTool" v-show="isShowLateX">
    <!-- 基础功能区 -->
    <div class="ShowLateX">
      <!-- 输入框 -->
      <InputBox></InputBox>
      <!-- 输出框 -->
      <OutputBox></OutputBox>
      <!-- 插入按钮 -->
      <InsertButton class="InsertButton"></InsertButton>
      <!-- 取消按钮 -->
      <CancelButton class="CancelButton" @click="isShowLateX = false"></CancelButton>
    </div>
    <!-- 快捷插入区 -->
    <div class="ShortCutToolBox">
      <!-- 根据Symbols文件 产生8个类别 -->
      <ShortCutTool
        v-for="item in Symbols"
        :key="item.id"
        :TitleCaseLetters="item.TitleCaseLetters"
        :DropDownTitle="item.DropDownTitle"
      ></ShortCutTool>
    </div>
  </div>
</template>
<style scoped lang="less">
#LatexTool {
  position: fixed;
  left: 10px;
  width: 282px;
  height: 300px;
  overflow-y: auto;
  .ShowLateX {
    border: 1px black solid;
    border-radius: 10px;
    background: #ffffff;
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
  .ShortCutToolBox {
    display: flex;
    width: 100%;
  }
}
</style>
