import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/:pathMatch(.*)',
        meta: { title: 404 },
        component: () => import('@/pages/NotFound.vue')
    },
    {
        path: '/login',
        component: () => import('@/pages/Login.vue')
    },
    {
        path: '/home',
        component: () => import('@/pages/Home.vue'),
        redirect: '/main',
        meta:{
            isAuth:true
        },

        children: [
            {
                path: '/main',
                name: '首页',
                component: () => import('@/components/main/Main.vue')
            },
            {
                path: '/order',
                name: '订单管理',
                component: () => import('@/components/order/Order.vue')
            },
            {
                path: '/room',
                name: '客房管理',
                component: () => import('@/components/room/Room.vue')
            },
            {
                path: '/hotelInfo',
                name: '酒店信息',

                component: () => import('@/components/hotel-info/HotelInfo.vue')
            },
            {
                path: '/my',
                name: '个人中心',
                component: () => import('@/components/my/My.vue')
            },
        ]
    },


]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    console.log(to.meta.isAuth);
    
    if (to.meta.isAuth) {
        const userStore = useUserStore()
        if (userStore.userInfo.token) {
            next()
        } else {
            ElMessage.warning({
                message: '需要登录'
            })
            next('/login')


        }
    } else {
        next()
    }
})



export default router