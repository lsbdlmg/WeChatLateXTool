<script setup>
import { ref } from 'vue'
import OutputBox from './components/OutputBox.vue'
import InputBox from './components/InputBox.vue'
import ShowButton from './components/ShowButton.vue'
import InsertButton from './components/InsertButton.vue'
const isShowLateX = ref(false)
</script>
<template>
  <ShowButton @click="isShowLateX = !isShowLateX" :title="'公式'"></ShowButton>
  <div id="LatexTool">
    <div v-show="isShowLateX" class="ShowLateX">
      <InputBox></InputBox>
      <OutputBox></OutputBox>
      <InsertButton :title="'插入'"></InsertButton>
    </div>
  </div>
</template>
<style scoped lang="less">
#LatexTool {
  position: fixed;
  left: 0;
  width: 100%;
  background: #ffffff;
  overflow-y: auto;
  .ShowLateX {
    margin: 10px;
  }
}
</style>
