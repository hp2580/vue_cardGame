<template>
  <card-header :opt="opt"></card-header>
</template>
<script setup lang="ts">
import CardHeader from '../components/CardHeader.vue'
const props = defineProps(['opt'])
</script>