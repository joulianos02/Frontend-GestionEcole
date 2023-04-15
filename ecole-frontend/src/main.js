import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { userStore } from '@/store/users'
import { useAssignmentStore } from '@/store/assignment'
import { useCourseStore } from '@/store/course'
import { relationStore } from '@/store/relation'

const app = createApp(App)

app.use(router)

const pinia = createPinia()

app.use(pinia)

pinia.use(userStore)
pinia.use(useAssignmentStore)
pinia.use(useCourseStore)
pinia.use(relationStore)

createApp(App).use(router).mount('#app');
