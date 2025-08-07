<script setup>
defineProps({
  DropDownTitle: {
    type: String,
    required: true,
  },
})
</script>
<template>
  <div class="DropDownTitle">
    <div class="DropDownPng">
      <img src="../assets/DropDown.png" alt="下拉" />
    </div>
    <span>{{ DropDownTitle }}</span>
  </div>
</template>
<style lang="less">
.DropDownTitle {
  background: #ffffff;
  width: 100%;
  height: 20px;
  line-height: 20px;
  display: flex;
  gap: 0.5vw;
  font-size: 10px;
  font-weight: 700;
  transition: background 0.3s ease;
  span {
    text-align: center;
  }
  img {
    width: 6px;
    margin: 8px 0 0 3px;
    line-height: 18px;
    transform: rotate(-90deg);
    transition: transform 0.3s ease;
  }
}
</style>
