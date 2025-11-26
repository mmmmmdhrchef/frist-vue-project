# 学习痕迹

## 第1次
1. vue引入的插件得在env.d.ts中声明类型
2. 路由的children 是 他的父亲管制 所有需要在 他的父亲中 写 <RouterView></RouterView>
3. children的路由路径记得[写活]   

## 第2次
1. mysql2 连接数据库的一个代码包
2. express 获取 mysql2数据库 执行数据库语句
3. token 一个门禁卡 进入一些涉及到你信息的网址要验证你的信息 仓库里面有token他就会解开拿东西 不然就要你重新登录
   1. 一般登陆后就会生成一个
4. jsonwebtoken 生成token的一个工具
   1. jwt.sign(数据[Payload],密钥[Secret Key],配置[Options])
   
## 第3次
1. 拦截器 网络api文件配置 api的post get 封装记得return出去
2. 登录成功后生成token 然后将权限 用户名 token 存放在仓库
3. 登录后做好使用useRouter()工具跳转
4. pinia数据持久化
5. 文本框添加icon图标
   1. :prefix-icon='User' 赋值属性在你要加的元素里面 
   2. import { User,  } from '@element-plus/icons-vue' User得自己去组件库引入
6. 导航守卫 设置进入网址前提检查 是否需要登录才能访问
   1. 大概原理就是进入前查看 源信息meta 中是否存在 rquireAuto:true 
   2. to 的路由存在信息就应该 检查现在是否存在仓库token
   3. router引入仓库 有token就next() 没有next({paht:'/login'}) 

## 第4次
1. Layout布局页面 
    就是一堆css样式
2. 左侧菜单布局 顶部导航栏布局
    依旧css样式 熟悉elUI组件
3. 左侧收起导航栏功能 右侧跟谁变化
   1. 关系到仓库 共享状态 
   2. 变化关系到 过渡
4. 顶部导航退出登录 个人中心页面 功能
   1. 删除token  
   2. 个人中心添加路由
5. 面包屑 
    获取当前路由 使用仓库中的面包屑文本处理

## 第5次
1. 不同权限的账号获取的路由不同 将路由改为后端获取
   1. 处理api请求 前端改为动态渲染路由
   2. /work改为动态添加 
   3. 设置404页面 
2. 设置3级路由 
    2级 因为3级太麻烦了
3. 设置抽屉功能 logo展示功能
    system共享logo状态

## 第6次
1. 首页顶部3个card组件
2. 熟悉echart的使用方法
    将echart的图表作为插件 设为全局方法来使用
    先注册在使用 注册成全局属性 方法 vue3的文档有  
3. 中间折线图
4. 底部3个图标
    六百六十六 遇到了 请求后才可以使用的问题 记得使用异步
    async await
5. 引入地图
通过将路由添加逻辑前置到路由守卫或应用初始化阶段，可以确保在路径解析时路由已经就绪

## 第7次
项目信息管理
1. 做好拥有分页功能的get接口 了解了SQL的limit offset
2. 封装请求接口 渲染获取15条数据  
    遇到个奇怪的问题  const page = req.query.page || 1; 记得 1放后面 不然一直取1qwq
3. 表格数据可视化(时间,备注)
4. el-tag 的默认值为 info 不是为 " " 不然会waring
   
## 第8次
1. 布置好 分页模块 搜索添加模块 UI
    keyup.enter是给 input 的 你怎么加在button上 qwq
    自定义事件 父组件接收的函数不可以加 () 哦qwq 不然你会收到undefined
2. 做好分页点击事件
3. 模糊搜索接口(记得sql参数化 防止注入风险)
4. 添加 富文本设计 有点复杂 
5. 编辑 数据预处理 以及 put请求
6. 删除功能
7. 国际化 语言切换功能

## 第9次
1. UI布局 Tree树形控件(固定width) + Tree-Context(flex=1)
2. Tree树形控件 一级 二级接口
3. Tree树形控件懒加载设置 (Node接收数据)
4. Tree树形控件内容显示 
5. ⭐后端接收文件数据功能
6. 完善预览功能(浏览器自带PDF) 
7. back() 路由KeepAlived 处理
8. 表格下拉处理

## 第10次
1. 系统信息管理 表格UI
2. 系统信息管理 搜索 添加 UI
3. 接口增删改查 
4. ID为1 的管理员无法处理   
   
## 第11次
1. 表单处理规则
    rule 记得属性写对
    ref  表单需要绑定
    prop 表单元素需要和rule对应
2. 超前地震预警完善

动态路由 以及tree树下个项目弄qwq

 
