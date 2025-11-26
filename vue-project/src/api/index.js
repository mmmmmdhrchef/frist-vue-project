//这里用于合成路径
import axios from "../utils/require"
import base from "./base"
const api = {
    //测试
    getList() {
        return axios.get(base.baseURL + base.list)
    },
    //登录
    postLogin(params) {
        //url+数据
        return axios.post(base.baseURL + base.login, params)
    },
    //权限路由
    getRouter(params) {
        return axios.get(base.baseURL + base.router, {
            params: params
        })
    },
    //图标信息
    getCharts() {
        return axios.get(base.baseURL + base.charts)
    },
    //项目信息
    getProject(params) {
        return axios.get(base.baseURL + base.project, {
            params: params
        })
    },
    //项目信息总条数
    getTotal() {
        return axios.get(base.baseURL + base.total);
    },
    //项目模糊搜索结果
    getSearch(params) {
        return axios.get(base.baseURL + base.search, {
            params: params
        })
    },
    //添加项目
    getAddProject(params) {
        return axios.get(base.baseURL + base.addProject, {
            params: params
        })
    },
    //删除项目
    getDelProject(params) {
        return axios.get(base.baseURL + base.delProject, {
            params: params
        })
    },
    //编辑项目数据预处理
    getUpdatePreProject(params) {
        return axios.get(base.baseURL + base.updatePreProject, {
            params: params
        })
    },
    //修改项目
    putUpdataProject(params, id) {
        return axios.put(base.baseURL + base.updateProject + id, params)
    },

    //
    //隧道设计信息 tree-一级
    getTunnelList() {
        return axios.get(base.baseURL + base.tunnelList)
    },
    //隧道设计信息 tree-二级
    getTunnelListChild(params) {
        return axios.get(base.baseURL + base.tunnelListChild, {
            params: params
        })
    },
    //隧道设计信息 tree节点对应数据
    getTunnelContent(params) {
        return axios.get(base.baseURL + base.tunnelContent, {
            params: params
        })
    },
    //修改 隧道设计信息 预览链接
    getUpdateContentUrl(params) {
        return axios.get(base.baseURL + base.updateContentUrl, {
            params: params
        })
    },
    //获取 隧道设计信息 预览链接
    getGetContentUrl(params) {
        return axios.get(base.baseURL + base.getContentUrl, {
            params: params
        })
    },

    //获取 系统信息管理 user数据
    getSystemList() {
        return axios.get(base.baseURL + base.systemList)
    },
    //系统信息管理 模糊搜索
    getSystemSearch(params) {
        return axios.get(base.baseURL + base.systemSearch, {
            params: params
        })
    },
    //系统信息管理 添加用户
    getSystemAdd(params) {
        return axios.get(base.baseURL + base.systemAdd, {
            params: params
        })
    },
    //系统信息管理 删除用户
    getSystemDel(params) {
        return axios.get(base.baseURL + base.systemDel, {
            params: params
        })
    },
    //系统信息管理 用户信息预处理接口
    getSystemUpdataPre(params) {
        return axios.get(base.baseURL + base.systemUpdataPre, {
            params: params
        })
    },
    //系统信息管理 修改用户信息
    putSystemUpdata(params, id) {
        return axios.put(base.baseURL + base.systemUpdata + id, params)
    }

}
export default api