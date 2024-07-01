<template>
  <form @submit.prevent="sendForm">
    <Input
      label="Nome"
      v-model="formData.name"
      :disabled="props.disabled"
      :rules="[() => !v$.name.required.$invalid || 'Nome é obrigatório']"
    />
    <Input
      label="CPF"
      type="tel"
      v-mask="'###.###.###-##'"
      v-model="formData.cpf"
      :disabled="props.disabled"
      :rules="[
        () => !v$.cpf.required.$invalid || 'CPF é obrigatório',
        () => !v$.cpf.cpf.$invalid || 'CPF é inválido',
      ]"
    />
    <Input
      label="Data de nascimento"
      v-mask="'##/##/####'"
      v-model="formData.birthDate"
      :disabled="props.disabled"
      :rules="[
        () => !v$.birthDate.required.$invalid || 'Data de nascimento é obrigatório',
        () => !v$.birthDate.date.$invalid || 'Data é inválida',
      ]"
    />
    <Input
      label="Telefone"
      v-mask="'(##) #####-####'"
      type="tel"
      v-model="formData.phone"
      :disabled="props.disabled"
      :rules="[
        () => !v$.phone.required.$invalid || 'Telefone é obrigatório',
        () => !v$.phone.phone.$invalid || 'Telefone é inválido',
      ]"
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
import { cpf, date, phone } from "@/utils/customValidators.js";

const props = defineProps({
  value: Object,
  disabled: {
    type: Boolean,
    default: false,
  },
});

onMounted(() => {
  const { secondStep } = props.value;
  formData.value = {
    name: secondStep.name,
    cpf: secondStep.cpf,
    birthDate: secondStep.birthDate,
    phone: secondStep.phone,
  };
});
const emit = defineEmits(["next-step", "back-step"]);

const formData = ref({
  name: "",
  cpf: "",
  birthDate: "",
  phone: "",
});

const rules = {
  name: { required },
  cpf: { required, cpf },
  birthDate: { required, date },
  phone: { required, phone },
};

const v$ = useVuelidate(rules, formData);
const isDisabled = computed(() => v$.value.$invalid);

const backStep = () => {
  emit("back-step");
};

const sendForm = () => {
  v$.value.$touch();
  if (v$.value.$invalid) {
    return;
  }
  emit("next-step", {
    secondStep: formData.value,
  });
};
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

.group_button {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  gap: 10px;
}
</style>
