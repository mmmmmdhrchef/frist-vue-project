//系统信息管理
const systemRouter = {
    path: 'system',
    name: 'system',
    component: () => import('../views/SystemManage/index.vue'),
    meta: {
        requireAuto: true,
        breadCrumbTitle: '系统信息管理'
    }
}

export default systemRouter
