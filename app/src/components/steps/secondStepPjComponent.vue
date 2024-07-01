<template>
  <form @submit.prevent="sendForm">
    <Input
      label="Razão Social"
      v-model="formData.companyName"
      :disabled="props.disabled"
      :rules="[() => !v$.companyName.required.$invalid || 'Razão Social é obrigatório']"
    />
    <Input
      label="CNPJ"
      type="tel"
      v-mask="'##.###.###/####-##'"
      v-model="formData.cnpj"
      :disabled="props.disabled"
      :rules="[
        () => !v$.cnpj.required.$invalid || 'CNPJ é obrigatório',
        () => !v$.cnpj.cnpj.$invalid || 'CNPJ é inválido',
      ]"
    />
    <Input
      label="Data de abertura"
      :disabled="props.disabled"
      v-mask="'##/##/####'"
      v-model="formData.creationDate"
      :rules="[
        () => !v$.creationDate.required.$invalid || 'Data de nascimento é obrigatório',
        () => !v$.creationDate.date.$invalid || 'Data é inválida',
      ]"
    />
    <Input
      label="Telefone"
      v-mask="'(##) #####-####'"
      type="tel"
      :disabled="props.disabled"
      v-model="formData.phone"
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
import { cnpj, date, phone } from "@/utils/customValidators.js";

const props = defineProps({
  value: Object,
  disabled: {
    type: Boolean,
    default: false,
  },
});

onMounted(() => {
  const { secondStepPj } = props.value;
  formData.value = {
    companyName: secondStepPj.companyName,
    cnpj: secondStepPj.cnpj,
    creationDate: secondStepPj.creationDate,
    phone: secondStepPj.phone,
  };
});
const emit = defineEmits(["next-step", "back-step"]);

const formData = ref({
  companyName: "",
  cnpj: "",
  creationDate: "",
  phone: "",
});

const rules = {
  companyName: { required },
  cnpj: { required, cnpj },
  creationDate: { required, date },
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
    secondStepPj: formData.value,
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
