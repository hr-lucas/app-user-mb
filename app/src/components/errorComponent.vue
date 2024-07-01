<template>
  <div class="message-error" v-for="(item, index) in props.items" :key="index">
    <img src="../assets/alert-icon.svg" />
    <p>{{ item }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  items: Array,
});
</script>

<style lang="scss" scoped>
.message-error {
  padding: 1em;
  display: flex;
  align-items: center;

  background-color: #f8d7da;
  color: #721c24;
  font-size: 1em;
  gap: 1em;
  margin-bottom: 1em;
  border-radius: 0.25rem;
  img {
    width: 1.5em;
  }
}
</style>
