<template>
  <div class="progress-bar-container">
    <div class="progress-bar" :style="{ width: `${props.progress}%` }"></div>
  </div>
</template>

<script setup>
const props = defineProps({
  progress: {
    type: [Number, String],
    required: true,
  },
});
</script>

<style>
.progress-bar-container {
  width: 100%;
  height: 5px;
  margin-bottom: 16px;
  background-color: #d1d5db;
}

.progress-bar {
  height: 5px;
  background-color: #ff6b00;
  transition: width 0.5s ease-in-out;
}
</style>
