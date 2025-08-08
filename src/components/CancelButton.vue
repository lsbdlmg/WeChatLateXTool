<script setup>
import { useStore } from 'vuex'
const store = useStore()
//重置输入框的值
const resetInputValue = () => {
  store.commit('SET_INPUT_VALUE', '')
  store.commit('SET_SVGFONTSIZE', '17')
  store.commit('SET_SVGCOLOR', 'inherit')
  store.commit('SET_SVGBGCOLOR', 'transparent')
  store.commit('SET_SVGDISPLAYMODE', true)
}
</script>
<template>
  <button @click="resetInputValue">取消</button>
</template>
<style scoped lang="less">
button {
  position: relative;
  right: -40px;
  bottom: -1px;
  margin-left: 1px;
  padding: 4px;
  border: 1px solid rgb(205, 205, 252);
  font-weight: 700;
  font-size: 12px;
  background: #005352;
  color: #ffffff;
  border-radius: 4px;
  transition: background 0.3s ease;
  cursor: pointer;
  &:hover {
    background: #004b3e;
  }
  &:active {
    background: #002c31;
  }
}
</style>
