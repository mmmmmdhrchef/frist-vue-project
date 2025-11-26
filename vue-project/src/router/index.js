import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView/index.vue'
import Layout from '../views/Layout.vue'

import { useLoginStore } from '@/stores/loginStore.js'
import { useMenuStore } from '@/stores/MenuStore.js'

import workRouter from '@/router/workRouter.js'


const routes = [
    //布局 因为登录 和 登录后是两个模块 
    {
        path: '/',
        name: 'layout',
        component: Layout,
        //重定向
        redirect:'home',
        children: [
            //首页
            {
                path: 'home',
                name: 'home',
                component: HomeView,
                meta:{
                    requireAuto:true,  //进入是否需要登录状态
                    breadCrumbTitle:'首页'
                }
            },
            //项目基础信息
            {
                path: 'project',
                name: 'project',
                component: () => import('../views/ProjectInfo/index.vue'),
                meta:{
                    requireAuto:true,
                    breadCrumbTitle:'项目基础信息'
                }
            },
            //隧道设计信息
            {
                path: 'tunnel',
                name: 'tunnel',
                component: () => import('../views/TunnelInfo/index.vue'),
                meta:{
                    requireAuto:true,
                    breadCrumbTitle:'隧道设计信息',
                }
            },
            //施工监控管理
            {
                path: 'build',
                name: 'build',
                component: () => import('../views/BuildManage/index.vue'),
                meta:{
                    requireAuto:true,
                    breadCrumbTitle:'施工监控管理'

                }
            },
            //超前地质预报
            {
                path: 'geological',
                name: 'geological',
                component: () => import('../views/GeologicalInfo/index.vue'),
                meta:{
                    requireAuto:true,
                    breadCrumbTitle:'超前地质预报'
                }
            },
            
            //个人中心
            {
                path: 'usercenter',
                name: 'usercenter',
                component: () => import('../views/UserCenter/index.vue'),
                meta:{
                    requireAuto:true,
                    breadCrumbTitle:'个人中心'
                }
            },
            //检测计划
            {
                path: 'plan',
                name: 'plan',
                component: () => import('../views/Plan/index.vue'),
                meta:{
                    requireAuto:true,
                    breadCrumbTitle:'检测计划'
                }
            },
            //切面检测
            {
                path: 'section',
                name: 'section',
                component: () => import('../views/Section/index.vue'),
                meta:{
                    requireAuto:true,
                    breadCrumbTitle:'切面检测'
                }
            },
        ]
    },
    //登录界面
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/LoginInfo/index.vue')
    },
    //404页面
    {
        path: "/:pathMatch(.*)",
        name: 'notfound',
        component: () => import('../views/NotFound/index.vue'),
    },
    //PDF预览
    {
        path: "/pdf/:id?",
        name: 'pdf',
        component: () => import('../views/PDF/index.vue'),
    }

]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

//声明路由前置导航(钩子函数)(进入前)
//处理是否需要登录状态才可以进入该路由
router.beforeEach((to,from,next) => {
    if(to.meta.requireAuto){
        const loginStore = useLoginStore()
        if(loginStore.token){
            next()
        }else{
            next({
                path:'/login'
            })
        }
    }else{
        next()
    }
})


//导航后置守卫 (已经进入了)
//处理面包屑
router.afterEach((to,from) =>{
    const menuStore = useMenuStore();
    menuStore.breadCrumbTitle = to.meta.breadCrumbTitle
})





export default router
