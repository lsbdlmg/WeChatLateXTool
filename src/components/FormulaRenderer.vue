<script setup>
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
const renderedHtml = ref('')
onMounted(() => {
  renderedHtmlFn()
})

const store = useStore()
const props = defineProps({
  formula: {
    type: String,
    required: true,
  },
})

const renderedHtmlFn = async () => {
  let count = 10 // 最多等待 10 次（每次等待 1 秒，共 10 秒）
  while (!window.MathJax && count > 0) {
    // 等待 1 秒
    await new Promise((resolve) => setTimeout(resolve, 1000))
    count--
  }
  try {
    // 创建临时容器用于渲染
    const tempContainer = document.createElement('div')
    tempContainer.style.position = 'absolute'
    tempContainer.style.visibility = 'hidden'
    tempContainer.style.width = '0'
    tempContainer.style.height = '0'
    //临时加入到body 不然svg的viewbox会有参数NaN
    document.body.appendChild(tempContainer)
    tempContainer.innerHTML = `\\[ ${props.formula} \\]`
    await window.MathJax.typesetPromise([tempContainer])
    renderedHtml.value = tempContainer.innerHTML
    // console.log(renderedHtml.value)
    //移除创建的临时容器
    document.body.removeChild(tempContainer)
  } catch (e) {
    console.error('公式渲染失败:', e)
    return `<span class="error" style="color:red">${props.formula}</span>`
  }
}
onMounted(() => {
  renderedHtmlFn()
})

const insertFormula = () => {
  const inputValue = store.getters.getInputValue
  const iframeCursorPosition = store.getters.getIframeCursorPosition
  const before = inputValue.substring(0, iframeCursorPosition)
  const after = inputValue.substring(iframeCursorPosition)
  store.commit('SET_INPUT_VALUE', before + props.formula + after)
  // 触发事件通知文本框更新光标位置
  setTimeout(() => {
    const newCursorPos = iframeCursorPosition + props.formula.length
    document.querySelector('textarea')?.focus()
    document.querySelector('textarea')?.setSelectionRange(newCursorPos, newCursorPos)
  }, 0)
}
</script>
<template>
  <div class="formula" v-html="renderedHtml" @click="insertFormula"></div>
</template>
<style scoped lang="less">
.formula {
  padding: 0 3px;
  min-width: 9px;
  height: fit-content;
  border: 1px solid rgb(81, 81, 81);
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
  transition: background 0.3s ease;
  &:hover {
    background: rgb(212, 212, 212);
  }
}
.formula-error {
  color: red;
  font-style: italic;
}
</style>
