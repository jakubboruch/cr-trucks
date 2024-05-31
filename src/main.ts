import '@/assets/main.scss'
import 'primevue/resources/themes/aura-light-noir/theme.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import { httpInterceptor } from '@/api/httpInterceptor'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue)
httpInterceptor()

app.mount('#app')
