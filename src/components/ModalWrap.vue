<template>
  <div class="modal">
    <div class="modal-content">
      <div class="modal-content-text">
        <slot name="modal-text"></slot>
      </div>
      <button 
        v-if="props.win"
        type="button" 
        class="modal-content-btn"
        @click="$emit('nextStage')"
      >
        Next Stage
      </button>
      <button 
        v-else
        type="button" 
        class="modal-content-btn"
        @click="$emit('tryAgain')"
      >
        Try Again
      </button>
    </div>
    <div class="modal-bg"></div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps(['win'])
</script>