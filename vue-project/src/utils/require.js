//引入需要的东西
import axios from "axios";

//创建axios实例 
const instance = axios.create({
    baseURL:"",
    timeout:5000
})

//拦截器
//请求前
instance.interceptors.request.use(
    config => {
        if(config.method === 'post'){
            config.data = JSON.stringify(config.data); // 转换为 JSON 字符串
            config.headers['Content-Type'] = 'application/json';
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

//请求后
instance.interceptors.response.use(
    res =>{
        //如果不是200返回给catch
        return res.status == 200 ? Promise.resolve(res) : Promise.reject(res)
    },
    error =>{
         //把最主要的东西拿出来
         
        const { response } = error;
        console.log(error);
        
        errorHandle(response.status,error.message)
        return Promise.reject(error)
    }
)

//error错误处理
const errorHandle = (status,info)=>{
    //2x 一般是请求了成功了
    //3x 客户端或者服务端配置问题
    //4x 用户操作错误或者前端代码问题
    //5x 服务端出现问题
    switch (status){
        case 400:
            console.log("语义错误");
            break;
        case 401:
            console.log("服务器认证失败");
            break;
        case 403:
            console.log("服务器拒绝访问");
            break;
        case 404:
            console.log("地址错误");
            break;
        case 500:
            console.log("服务器遇到意外");
            break;
        case 502:
            console.log("服务器无响应");
            break;
        default:
            console.log(info);
            break; 
    }
}

//导出工具
export default instance
