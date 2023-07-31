import { createRouter, createWebHistory } from 'vue-router'
// createRouter方法，用于创建路由器实例，可以管理多个路由
export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/home',
            name: 'home',
            component: ()=>import('@/pages/home/index.vue'),
            meta: {
                title: '首页',
                vis: true
            }
        },
        {
            path: '/hospital',
            name: 'hospital',
            component: ()=>import('@/pages/hospital/index.vue'),
            children: [
                {
                    path: 'register',
                    name: 'register',
                    component: ()=>import('@/pages/hospital/register/index.vue'),
                    meta: {
                        title: '预约挂号',
                        vis: true
                    }
                },
                {
                    path: 'detail',
                    name: 'detail',
                    component: ()=>import('@/pages/hospital/detail/index.vue'),
                    meta: {
                        title: '医院详情',
                        vis: true
                    }
                },
                {
                    path: 'notice',
                    name: 'notice',
                    component: ()=>import('@/pages/hospital/notice/index.vue'),
                    meta: {
                        title: '预约通知',
                        vis: true
                    }
                },
                {
                    path: 'close',
                    name: 'close',
                    component: ()=>import('@/pages/hospital/close/index.vue'),
                    meta: {
                        title: '停诊信息',
                        vis: true
                    }
                },
                {
                    path: 'search',
                    name: 'search',
                    component: ()=>import('@/pages/hospital/search/index.vue'),
                    meta: {
                        title: '查询/取消',
                        vis: true
                    }
                },
                {
                    path: 'register_step1',
                    name: 'register_step1',
                    component: ()=>import('@/pages/hospital/register/register_step1.vue'),
                    meta: {
                        title: '预约1',
                        vis: true
                    }
                },
                {
                    path: 'register_step2',
                    name: 'register_step2',
                    component: ()=>import('@/pages/hospital/register/register_step2.vue'),
                    meta: {
                        title: '预约2',
                        vis: true
                    }
                }
            ]
        },
        {
            path: '/wxlogin',
            name: 'wxlogin',
            component: ()=>import('@/pages/wxlogin/index.vue')
        },
        {
            path: '/user',
            name: 'user',
            component: ()=>import('@/pages/user/index.vue'),
            children: [
                {
                    path: 'certification',
                    component: () => import('@/pages/user/certification/index.vue'),
                    meta:{
                        title:'实名认证'
                    }
                },
                {
                    path: 'order',
                    component: () => import('@/pages/user/order/index.vue'),
                    meta:{
                        title:'挂号订单'
                    }
                },
                {
                    path: 'patient',
                    component: () => import('@/pages/user/patient/index.vue'),
                    meta:{
                        title:'就诊人管理'
                    }
                },
                {
                    path: 'profile',
                    component: () => import('@/pages/user/profile/index.vue'),
                    meta:{
                        title:'账号信息'
                    }
                },
                {
                    path: 'feedback',
                    component: () => import('@/pages/user/feedback/index.vue'),
                    meta:{
                        title:'信息反馈'
                    }
                }
            ]
        },
        {
            path: '/',
            redirect: '/home'
        },
       /*  {
            path: '/hospital',
            redirect: '/hospital/register'
        } */
    ],
    scrollBehavior() {
        return {
            left: 0,
            top: 0
        }
    }
})