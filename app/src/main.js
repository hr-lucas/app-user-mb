import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import VueTheMask from 'vue-the-mask'

createApp(App)
  .use(VueTheMask)
  .mount('#app')

