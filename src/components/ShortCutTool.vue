<script setup>
import { ref } from 'vue'
import LettersBox from './LettersBox.vue'
import DropdownTitle from './DropdownTitle.vue'

const props = defineProps({
  TitleCaseLetters: {
    type: Array,
    required: true,
  },
  DropDownTitle: {
    type: String,
    required: true,
  },
})

const showLetters = ref(false)
</script>
<template>
  <div class="ShortCutTool" @mouseenter="showLetters = true" @mouseleave="showLetters = false">
    <DropdownTitle :DropDownTitle="props.DropDownTitle"></DropdownTitle>
    <div class="AllLettersBox" v-show="showLetters">
      <LettersBox
        v-for="item in props.TitleCaseLetters"
        :key="item.case"
        :letters="item.letters"
        :title="item.title"
        :case="item.case"
      ></LettersBox>
    </div>
  </div>
</template>

<style lang="less">
.ShortCutTool {
  width: 40px;
  height: 0%;
  display: flex;
  flex-direction: column;
  font-size: 10px;
  .AllLettersBox {
    z-index: 10000;
    position: fixed;
    width: 280.5px;
    top: 265px;
    left: 10px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-end-end-radius: 10px;
    border-end-start-radius: 10px;
    background: #fff;
  }
  &:hover {
    .DropDownTitle {
      background: #e1e1e1;
      .DropDownPng img {
        transform: rotate(0deg);
      }
    }
  }
}
</style>
