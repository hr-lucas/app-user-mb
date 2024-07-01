<template>
  <form @submit.prevent="sendForm">
    <Input
      label="Sua senha"
      v-model="formData.password"
      type="password"
      :disabled="props.disabled"
      :rules="[() => !v$.password.required.$invalid || 'Senha é obrigatório']"
    />

    <template v-if="!props.disabled">
      <div class="group_button">
        <button class="button_back" @click="backStep">Voltar</button>
        <button type="submit" :disabled="isDisabled">Continuar</button>
      </div>
    </template>
  </form>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import Input from "../input.vue";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

const props = defineProps({
  value: Object,
  disabled: {
    type: Boolean,
    default: false,
  },
});

onMounted(() => {
  const { thirdStep } = props.value;
  formData.value = {
    password: thirdStep.password,
  };
});
const emit = defineEmits(["next-step", "back-step"]);

const formData = ref({
  password: "",
});

const rules = {
  password: { required },
};

const v$ = useVuelidate(rules, formData);
const isDisabled = computed(() => v$.value.$invalid);

const backStep = () => {
  emit("back-step");
};

const sendForm = () => {
  if (v$.value.$invalid) {
    return;
  }
  emit("next-step", {
    thirdStep: formData.value,
  });
};
</script>

<style lang="scss" scoped>
.group_button {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  gap: 10px;
}

button {
  margin-top: 20px;
  width: 100%;
  padding: 15px;
  background-color: #ff6b00;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &.button_back {
    background-color: transparent;
    border: 1px solid #ff6b00;
    color: #ff6b00;
  }
}
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
