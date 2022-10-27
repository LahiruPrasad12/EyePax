import {createRouter, createWebHistory} from '@ionic/vue-router';
import Auth from './modules/auth'
import SupplierTab from '../views/supplier/index'
import StockTab from '../views/stock/index'
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
                path: 'tracking',
                component: () => import('@/views/admin-dashboard/tracking/index')
            },
            {
                path: 'staff',
                component: () => import('@/views/admin-dashboard/staff/index')
            },
        ]
    },
    {
        path: '/supplier/',
        component: SupplierTab,
        children: [
            {
                path: 'home',
                component: () => import('@/views/supplier/items/index')
            },
            {
                path: 'request',
                component: () => import('@/views/supplier/request/index')
            }
        ]
    },
    {
        path: '/stock/',
        component: StockTab,
        children: [
            {
                path: 'home',
                component: () => import('@/views/stock/stocks/index')
            },
            {
                path: 'purchaseorder',
                component: () => import('@/views/supplier/request/index')
            },
            {
                path: 'supplyrequest',
                component: () => import('@/views/stock/request/index')
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
