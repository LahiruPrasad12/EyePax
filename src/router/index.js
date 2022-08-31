import {createRouter, createWebHistory} from '@ionic/vue-router';
import Auth from './modules/auth'
import TabsPage from '../views/admin-dashboard/index'

const routes = [
    ...Auth,
    {
        path: '/',
        component: () => import ('@/views/landing-page/index'),
    },
    {
        path: '/admin_home/',
        component: TabsPage,
        children: [
            {
                path: '',
                redirect: '/admin_home/dash_board'
            },
            {
                path: 'dash_board',
                component: () => import('@/views/admin-dashboard/dashboard/index')
            },
            {
                path: 'staff',
                component: () => import('@/views/admin-dashboard/staff/index')
            },
        ]
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
