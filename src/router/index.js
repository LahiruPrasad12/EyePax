import {createRouter, createWebHistory} from '@ionic/vue-router';
import Auth from './modules/auth'

const routes = [
    ...Auth
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
