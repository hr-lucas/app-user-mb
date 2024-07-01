<script setup>
import { watch, ref, onMounted, computed } from "vue";
import moment from "moment";

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  rules: {
    type: Array,
    default: () => [],
  },
  type: {
    type: String,
    default: "text",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const model = ref();
const error = ref("");
const required = ref(false);
const emit = defineEmits(["update:modelValue", "input"]);

onMounted(() => {
  if (props.modelValue) model.value = props.modelValue;
  required.value = props?.rules?.some((rule) => rule.name === "required");
});

if (props.type !== "date") {
  watch(
    () => props.modelValue,
    (newValue) => {
      model.value = newValue;
    }
  );
}

const labelText = computed(() => props.label || "");

const validInput = () => {
  for (let rule of props.rules) {
    const errorMessage = rule(model.value);
    if (errorMessage !== true) {
      error.value = errorMessage;
      return;
    }
  }
  error.value = "";
};

watch(model, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    if (props.type === "date") {
      const formattedValue = moment(newValue).format("DD/MM/YYYY");
      emit("update:modelValue", formattedValue);
      emit("input", formattedValue);
    } else {
      emit("update:modelValue", newValue);
      emit("input", newValue);
    }
    validInput();
  }
});
</script>

<template>
  <div class="form__group field">
    <input
      :id="labelText"
      v-bind="$attrs"
      :type="props.type"
      v-model="model"
      @blur="validInput"
      :disabled="props.disabled"
      :class="{ form__field: true, 'input-error': error }"
      class="form__field"
      :placeholder="labelText"
    />
    <label
      :for="labelText"
      :class="{ form__label: true, 'label-error': error }"
      class="form__label"
    >
      {{ labelText }}
    </label>
    <p v-if="error" class="error-message">{{ error }}</p>
  </div>
</template>

<style scoped>
.form__group {
  position: relative;
  padding: 15px 0 0;
  margin-top: 10px;
  width: 100%;
  min-width: 250px;
}

.form__field {
  font-family: inherit;
  width: 100%;
  border: 0;
  border-bottom: 1px solid #9b9b9b;
  outline: 0;
  font-size: 1rem;
  color: #fff;
  padding: 7px 0;
  background: transparent;
  transition: border-color 0.2s;
}

.form__field::placeholder {
  color: transparent;
}

.form__field:placeholder-shown ~ .form__label {
  font-size: 1rem;
  cursor: text;
  top: 18px;
}

.form__label {
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 1rem;
  color: #9b9b9b;
}

.form__field:focus ~ .form__label {
  top: 0;
  font-size: 1rem;
  font-weight: 300;
  width: 100%;
}

.form__field:focus {
  padding-bottom: 6px;
  font-weight: 300;
  border-width: 1px;
  border-image-slice: 1;
  width: 100%;
}

.form__field:required,
.form__field:invalid {
  box-shadow: none;
}

.input-error {
  border-color: #c10015;
}

.label-error {
  color: #c10015;
}

.error-message {
  margin-top: 5px;
  font-size: 0.75rem;
  color: #c10015;
}
</style>
