<script setup>
defineProps({
  title: String,
})
</script>
<template>
  <button>{{ title }}</button>
</template>
<style scoped lang="less">
button {
  margin-left: 1px;
  padding: 5px;
  border: 1px solid rgb(205, 205, 252);
  font-weight: 700;
  font-size: 14px;
  background: #7d88f9;
  color: #ffffff;
  border-radius: 5px;
  transition: background 0.3s ease;
  cursor: pointer;
  &:hover {
    background: #0066ff;
  }
  &:active {
    background: #0052cc;
  }
}
</style>
