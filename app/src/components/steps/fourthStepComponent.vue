<template>
  <form @submit.prevent="sendForm">
    <ErrorComponent :items="errors" v-if="errors.length" />
    <FirstStep :value="props.value" :disabled="true" />
    <SecondStepPf :value="props.value" :disabled="true" v-if="isPf" />
    <SecondStepPj :value="props.value" :disabled="true" v-else />
    <ThirdStep :value="props.value" :disabled="true" />
    <div class="group_button">
      <button class="button_back" @click.prevent="backStep">Voltar</button>
      <button type="submit">Cadastrar</button>
    </div>
  </form>
</template>

<script setup>
import { computed, ref } from "vue";
import FirstStep from "./firstStepComponent.vue";
import SecondStepPf from "./secondStepPfComponent.vue";
import SecondStepPj from "./secondStepPjComponent.vue";
import ErrorComponent from "../errorComponent.vue";
import ThirdStep from "./ThirdStepComponent.vue";
import { flattenFormData } from "@/utils/formUtils";

const isPf = computed(() => props.value.firstStep.typeForm === "PF");
const emit = defineEmits(["next-step", "back-step"]);

const props = defineProps({
  value: Object,
});

const backStep = () => {
  emit("back-step");
};

const errors = ref([]);

const sendForm = async () => {
  const flattenedFormData = flattenFormData(props.value);

  errors.value = [];
  try {
    const response = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(flattenedFormData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.messages.join(", "));
    }

    emit("next-step");
  } catch (error) {
    errors.value = error.message.split(", ");
  }
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
