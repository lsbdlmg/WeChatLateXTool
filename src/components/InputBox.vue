<script setup>
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const textareaRef = ref(null)
//输入框绑定
const inputValue = computed({
  get() {
    return store.getters.getInputValue
  },
  set(value) {
    store.commit('SET_INPUT_VALUE', value)
  },
})
// 更新光标位置（后续放快捷输入的时候用）
const updateCursorPosition = () => {
  if (textareaRef.value) {
    const position = textareaRef.value.selectionStart
    store.commit('SET_CURSOR_POSITION', position)
  }
}
//加载时获取输入文本框 后续记录光标位置
onMounted(() => {
  textareaRef.value = document.querySelector('.inputBox textarea')
})
const goTutorial = () => {
  window.parent.open('https://blog.csdn.net/Yushan_Ji/article/details/134322574')
}
</script>
<template>
  <div class="inputBox">
    <div class="titleBox">
      <p>输入区域</p>
      <button class="goTutorial" @click="goTutorial">输入教程</button>
    </div>
    <textarea
      v-model="inputValue"
      placeholder="请输入你的LateX表达式"
      @focus="updateCursorPosition"
      @input="updateCursorPosition"
      @selectionchange="updateCursorPosition"
    ></textarea>
  </div>
</template>
<style lang="less">
.inputBox {
  width: 280px;
  height: 80px;
  margin: 0 0 5px;
  .titleBox {
    display: flex;
    gap: 5px;
    margin: 2px 0;
    .goTutorial {
      position: relative;
      left: 155px;
      padding: 2px 4px;
      border: 1px solid rgb(205, 205, 252);
      font-weight: 700;
      font-size: 12px;
      background: #7d88f9;
      color: #ffffff;
      border-radius: 4px;
      transition: background 0.3s ease;
      cursor: pointer;
      &:hover {
        background: #0066ff;
      }
      &:active {
        background: #0052cc;
      }
    }
    p {
      margin: 2px 0 2px 7px;
      font-weight: 700;
      width: 50px;
      font-size: 12px;
    }
  }

  textarea {
    font-weight: 700;
    font-size: 12px;
    padding: 1px 5px;
    margin: 0 5px;
    border: 1px solid #e0e0e0;
    width: 270px;
    height: 50px;
    resize: none;
    outline: none;
    border-radius: 3px;
    transition:
      border-color 0.3s ease,
      box-shadow 0.3s ease,
      background-color 0.3s ease;
    background-color: #fafafa;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.03);
    /* 聚焦状态强化 */
    &:focus {
      border-color: #4d90fe;
      box-shadow: 0 0 0 1px rgba(77, 144, 254, 0.25);
      background-color: #fff;
      border-width: 1.5px;
    }

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
}
</style>
