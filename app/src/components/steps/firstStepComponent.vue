<template>
  <form @submit.prevent="sendForm">
    <Input
      label="Endereço de e-mail"
      v-model="formData.email"
      :disabled="props.disabled"
      :rules="[
        () => !v$.email.required.$invalid || 'E-mail é obrigatório',
        () => !v$.email.email.$invalid || 'E-mail inválido',
      ]"
    />

    <Radios
      title=""
      :items="option"
      :value="formData.typeForm"
      :disabled="props.disabled"
      v-model="formData.typeForm"
      v-if="!props.disabled"
    />
    <template v-if="!props.disabled">
      <button type="submit" :disabled="isDisabled">Continuar</button>
    </template>
  </form>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import Input from "../input.vue";
import Radios from "../InputRadios.vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";

const props = defineProps({
  value: Object,
  disabled: {
    type: Boolean,
    default: false,
  },
});

onMounted(() => {
  const { firstStep } = props.value;
  formData.value = {
    email: firstStep.email,
    typeForm: firstStep.typeForm,
  };
});
const emit = defineEmits(["next-step"]);
const option = [
  {
    label: "Pessoa Física",
    value: "PF",
  },
  {
    label: "Pessoa Jurídica",
    value: "PJ",
  },
];

const formData = ref({
  email: "",
  typeForm: "",
});

const rules = {
  email: { required, email },
  typeForm: { required },
};

const sendForm = () => {
  v$.value.$touch();
  if (v$.value.$invalid) {
    return;
  }
  emit("next-step", {
    firstStep: formData.value,
  });
};
const v$ = useVuelidate(rules, formData);

const isDisabled = computed(() => v$.value.$invalid);
</script>

<style lang="scss" scoped>
button {
  margin-top: 20px;
  width: 100%;
  padding: 15px;
  background-color: #ff6b00;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
