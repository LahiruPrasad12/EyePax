import {createRouter, createWebHistory} from '@ionic/vue-router';
import Auth from './modules/auth'
import TabsPage from '../views/admin-dashboard/index'

const routes = [
    ...Auth,
    {
        path: '/tabs/',
        component: TabsPage,
        children: [
            {
                path: '',
                redirect: '/tabs/dash_board'
            },
            {
                path: 'dash_board',
                component: () => import('@/views/admin-dashboard/page1')
            },
            {
                path: 'my_Shifts',
                component: () => import('@/views/admin-dashboard/page2')
            },
        ]
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
