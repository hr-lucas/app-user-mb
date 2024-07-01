<template>
  <main>
    <section v-if="step <= 4">
      <header>
        <ProgressBar :progress="progressBar" />
        <div class="header_content">
          <h2 class=" ">
            Etapa <span class="step_select"> {{ step }}</span> de 4
          </h2>
          <h1 class="description">{{ isComponent.title }}</h1>
        </div>
      </header>
      <body class="px-[2%] py-5 min-w-lg">
        <component
          :is="isComponent.componentName"
          @next-step="nextForm"
          @back-step="step--"
          :value="formData"
          :isPf="isPf"
        />
      </body>
    </section>
    <section class="finish" v-if="step > 4">
      <h2>Usuario criado!</h2>
      <button @click="resetForm">Criar nova conta</button>
    </section>
  </main>
</template>

<script setup>
import { computed, ref } from "vue";
import ProgressBar from "./progressBar.vue";
import { defineAsyncComponent } from "vue";

const FirstStep = defineAsyncComponent(() => import("./steps/firstStepComponent.vue"));
const SecondStepPf = defineAsyncComponent(() =>
  import("./steps/secondStepPfComponent.vue")
);
const SecondStepPj = defineAsyncComponent(() =>
  import("./steps/secondStepPjComponent.vue")
);
const ThirdStep = defineAsyncComponent(() => import("./steps/ThirdStepComponent.vue"));
const FourthStep = defineAsyncComponent(() => import("./steps/fourthStepComponent.vue"));

const step = ref(5);
const formData = ref({
  firstStep: {
    email: "",
    typeForm: "",
  },
  secondStep: {
    name: "",
    cpf: "",
    birtDay: "",
    phone: "",
  },
  secondStepPj: {
    companyName: "",
    cnpj: "",
    creationDate: "",
    phone: "",
  },
  thirdStep: {
    password: "",
  },
});

const progressBar = computed(() => step.value * 25);

const nextForm = (value) => {
  step.value++;
  formData.value = { ...formData.value, ...value };
};

const isPf = computed(() => formData.value.firstStep.typeForm === "PF");

const formattedRenderSecondStep = () => {
  const rendePfOrPj = {
    true: {
      component: SecondStepPf,
      title: "Cadastro Pessoa Física",
    },
    false: {
      component: SecondStepPj,
      title: "Cadastro Pessoa Jurídica",
    },
  };
  return rendePfOrPj[isPf.value];
};

const resetForm = () => {
  step.value = 1;
  formData.value = {
    firstStep: {
      email: "",
      typeForm: "",
    },
    secondStep: {
      name: "",
      cpf: "",
      birtDay: "",
      phone: "",
    },
    secondStepPj: {
      companyName: "",
      cnpj: "",
      creationDate: "",
      phone: "",
    },
    thirdStep: {
      password: "",
    },
  };
};

const isComponent = computed(() => {
  const secondStep = formattedRenderSecondStep();
  const componentes = {
    1: {
      componentName: FirstStep,
      title: "Seja bem vindo(a)",
    },
    2: {
      componentName: secondStep.component,
      title: secondStep.title,
    },
    3: {
      componentName: ThirdStep,
      title: "Senha de acesso",
    },
    4: {
      componentName: FourthStep,
      title: "Revise suas informações",
    },
  };
  return componentes[step.value];
});
</script>

<style lang="scss" scoped>
main {
  width: 100%;
  height: 100vh;
  padding: 20px;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  gap: 1em;
  margin: 0 auto;
  justify-content: center;
}

.header_content {
  display: flex;
  flex-direction: column;
  gap: 1em;
  font-weight: 400;
  .step_select {
    color: #ff6b00;
    font-weight: 700;
  }
  .description {
    font-size: 1.5rem;
  }
}

button {
  margin-top: 20px;
  padding: 15px;
  background-color: #ff6b00;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.finish {
  text-align: center;
}
</style>
