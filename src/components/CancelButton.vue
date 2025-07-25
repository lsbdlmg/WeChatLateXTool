<script setup>
import { useStore } from 'vuex'
const store = useStore()
//重置输入框的值
const resetInputValue = () => {
  store.commit('SET_INPUT_VALUE', '')
}
</script>
<template>
  <button @click="resetInputValue">取消</button>
</template>
<style scoped lang="less">
button {
  margin-left: 1px;
  padding: 5px;
  border: 1px solid rgb(205, 205, 252);
  font-weight: 700;
  font-size: 14px;
  background: #7df9f7;
  color: #ffffff;
  border-radius: 5px;
  transition: background 0.3s ease;
  cursor: pointer;
  &:hover {
    background: #8ffde9;
  }
  &:active {
    background: #75edfa;
  }
}
</style>
