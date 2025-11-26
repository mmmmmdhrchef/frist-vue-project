//这是存在所有路径的
const base = {
    baseURL:'http://localhost:3000/api',    //主域名
    login:'/login',                         //登录接口
    list:'/list',                           //测试接口
    router:'/router',                       //路由接口
    charts:'/charts',                       //图表数据接口
    
    project:'/project/all',                 //项目信息接口
    total:'/project/total',                 //项目信息总条数
    search:'/project/search',               //项目模糊搜索结果接口
    addProject:'/project/add',              //项目添加接口
    delProject:'/project/del',              //项目删除接口
    updatePreProject:'/project/update/pre', //项目编辑数据预处理接口
    updateProject:'/project/update/',       //项目修改接口

    tunnelList:'/tunnel/list',                          //隧道设计信息 tree-一级数据接口
    tunnelListChild:'/tunnel/list/child',               //隧道设计信息 tree-二级数据接口    
    tunnelContent:'/tunnel/content',                    //隧道设计信息 tree对应的内容接口   
    updateContentUrl:'/tunnel/content/updateUrl',       //隧道设计信息 修改预览链接
    getContentUrl:'/tunnel/content/getUrl',             //隧道设计信息 获取预览链接

    systemList:'/system/list',                          //系统信息管理 user数据接口
    systemSearch:'/system/search',                      //系统信息管理 模糊搜索接口
    systemAdd:'/system/add',                            //系统信息管理 添加用户接口
    systemDel:'/system/del',                            //系统信息管理 删除用户接口
    systemUpdataPre:'/system/update/pre',               //系统信息管理 用户信息预处理接口
    systemUpdata:'/system/update/',                     //系统信息管理 修改用户信息接口
}
export default base