const express = require('express')
const app = express()
const router = require('./router.js')

// 使用express.json()中间件来解析application/json格式的请求体
app.use(express.json());

// 使用中间件解析urlencoded格式的请求体
app.use(express.urlencoded({ extended: true }));

//解决跨域问题
const cors = require('cors')
app.use(cors())

//发送post设置
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
    extended:true
}))

//引入路由
app.use('/api',router)

app.use(express.static("upload"));
//监听
app.listen(3000,() =>{
    console.log('服务器运行在3000端口上');
})