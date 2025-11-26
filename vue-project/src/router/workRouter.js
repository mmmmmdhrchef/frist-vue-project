const workRouter =  {
    path: 'work',
    name: 'work',
    component: () => import('../views/WorkManage/index.vue'),
    meta:{
        requireAuto:true,
        breadCrumbTitle:'工作监督管理'
    }
}
export default workRouter
