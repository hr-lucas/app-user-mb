<template>
  <div>
    <div class="information_radios">
      <p>{{ props.title }}</p>
    </div>
    <div class="radio-container">
      <template v-for="(item, index) in items" :key="index">
        <div class="radio-item">
          <input
            :id="`inline-radio-${item.value}`"
            type="radio"
            :value="item.value"
            name="inline-radio-group"
            @click="model = item.value"
            class="custom-radio"
            :disabled="props.disabled"
            :checked="item.value === value"
          />
          <label :for="`inline-radio-${item.value}`" class="radio-label">
            {{ item.label }}
          </label>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { watch, ref } from "vue";

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    default: "",
  },
  value: {
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const model = ref(props.value);

const emit = defineEmits(["update:modelValue", "input"]);

watch(model, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    emit("update:modelValue", newValue);
    emit("input", newValue);
  }
});
</script>

<style>
.information_radios {
  font-size: 0.75rem;
  font-weight: 500;
  color: white;
}

.radio-container {
  display: flex;
  align-items: center;
  margin: 1rem 0;
  gap: 3.5rem;
  margin-right: 2.5rem;
}

.radio-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.custom-radio {
  appearance: none;
  padding: 0.5rem;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  border: 1px solid #ef4723;
  outline: none;
  display: grid;
  place-content: center;
  position: relative;
}

.custom-radio::before {
  content: "";
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  background-color: #ef4723;
  transform: scale(0);
  transition: transform 0.1s ease-in-out;
  box-shadow: 0 0 0 2px #ef4723 inset;
}

.custom-radio:checked::before {
  transform: scale(1);
}

.radio-label {
  margin-left: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #d1d5db;
}
</style>
