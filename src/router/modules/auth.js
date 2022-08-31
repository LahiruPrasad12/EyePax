export default [
    {
        path: '/',
        component: () => import ('@/views/landing-page/index'),
    },
    {
        path: '/login',
        component: () => import ('@/views/auth/login'),
    },
    {
        path: '/test',
        component: () => import ('@/views/test'),
    },
]
