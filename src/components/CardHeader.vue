<template>
  <div class="card-header">
    <div class="card-header-timer">{{ props.opt.timer }}</div>
    <div class="card-header-stage">Stage {{ props.opt.stage }}</div>
    <button type="button" class="card-header-btn">
      <span class="hidden">홈으로 이동</span>
    </button>
  </div>
</template>
<script setup lang="ts">
const props = defineProps(['opt'])
</script>