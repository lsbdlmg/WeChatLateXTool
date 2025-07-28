<script setup>
import FormulaRenderer from './FormulaRenderer.vue'
const props = defineProps({
  letters: {
    type: Set,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  case: {
    type: String,
    required: true,
  },
})
</script>
<template>
  <div class="LettersBox">
    <p>{{ props.title }}</p>
    <div class="SmallLettersBox">
      <FormulaRenderer
        v-for="(letter, name) in props.letters"
        :key="`${props.case}-${name}`"
        :formula="letter"
      />
    </div>
  </div>
</template>

<style lang="less">
.LettersBox {
  display: flex;
  flex-direction: column;
  p {
    width: fit-content;
    font-weight: 700;
    margin: 0;
    padding: 5px;
  }
  .SmallLettersBox {
    margin: 0 2px 5px;
    display: flex;
    flex-wrap: wrap;
    gap: 3px;
  }
}
</style>
