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
</script>
<template>
  <div class="inputBox">
    <p>输入区域</p>
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
  width: 270px;
  height: 80px;
  margin: 0 0 5px;
  p {
    font-weight: 700;
    font-size: 14px;
  }
  textarea {
    font-weight: 700;
    font-size: 14x;
    padding: 0 5px;
    border: 1px solid #ccc;
    width: 270px;
    height: 50px;
    outline: none;
  }
}
</style>
