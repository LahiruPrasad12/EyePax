import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Auth from './modules/auth'
const routes: Array<RouteRecordRaw> = [
    ...Auth
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
