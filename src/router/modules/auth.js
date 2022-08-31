export default [
    {
        path: '/login',
        component: () => import ('@/views/auth/login'),
    },
    {
        path: '/test',
        component: () => import ('@/views/test'),
    },
]
