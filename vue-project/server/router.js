const express = require('express');
const router = express.Router();

//引入jwt(token) 
const jwt = require('jsonwebtoken')
const jwtSecret = require('./jwtSecret.js')
//引入整合数据库工具
const SQLConnect = require('./SQLConnect.js');

//引入admin vip路由
const adminData = require('./data/adminData.js')
const vipData = require('./data/vipData.js')

//引入charts数据
const chartsData = require('./data/chartsData.js')

//引入multer 处理文件  
const multer = require('multer');
const fs = require('fs')

//添加接口
router.get('/list', (req, res) => {
    res.send({
        status: 200,
        message: '测试服务器'
    })
})

// req:包含了客户端（如浏览器）发送过来的所有信息
// res:向客户端返回处理结果
/**
 * req.body: 获取POST请求提交的数据
 * req.query: 获取GET请求 URL中的查询参数(?name= value)
 * req.params: 获取GEI请求 URL路径中的参数
 * 
 * res.json(): 发送JSON格式响应
 * res.send(): 发送各种类型的响应
 * res.status(): 设置HTTP状态码
 * 
 */

/**
 * 发送登录结果
 */
router.post('/login', (req, res) => {
    //
    const { username, password } = req.body;
    const sql = 'select * from user where username =? and password = ?';
    // 使用准备好的整合sql的query函数
    SQLConnect(sql, [username, password], (result) => {
        //我们这里查询user库有没有该账号密码
        //找不到数据说明用户名密码错误
        if (result.length > 0) {
            /** 
             * 生成token
             * token相当于门禁卡 当你登录后就给你一个token
             * 当你需要进去某些页面要验证你账号密码 然后你把token给他看 就可以知道是你 不需要你再输入密码账号
             *
            */
            // 使用 jwt.sign 生成 Token
            const token = jwt.sign({
                // 这是 Payload，可以放入你想携带的信息
                id: result[0].id,
                username: result[0].username,
                permission: result[0].permission
            }
                // Secret Key 这是密钥，用于签名
                , jwtSecret.secret,
                {
                    expiresIn: '1h' // 这是 Options，设置 Token 1小时后过期
                })

            res.send({
                status: 200,
                username: result[0].username,
                password: result[0].password,
                permission: result[0].permission,
                token
            })
        } else {
            res.send({
                status: 500,
                msg: '用户名密码错误'
            })
        }
    })
})

/**
 * 根据身份发送路由数据
*/
router.get('/router', (req, res) => {
    const user = req.query.user;   //这是解析req中的数据 拿取user

    //switch 的判断非常严格
    switch (String(user)) {
        case 'admin':
            res.send({
                status: 200,
                menuData: adminData
            })
            break;
        case 'vip':
            res.send({
                status: 200,
                menuData: vipData
            })
            break;
        default:
            res.send({
                status: 200,
                menuData: vipData
            })
            break;
    }
})

/**
 * 图标信息数据
*/
router.get('/charts', (req, res) => {
    res.send({
        status: 200,
        chartsData: chartsData
    })
})

/**
 *  项目信息条数 
 */
router.get('/project/total', (req, res) => {
    const sql = `select count(*) from project`;
    // 使用准备好的整合sql的query函数
    SQLConnect(sql, null, (result) => {
        res.send({
            status: 200,
            result: result,
        })
    })
})

/**
 * 发送项目信息数据
 */
router.get('/project/all', (req, res) => {
    //拥有分页功能  {{page:定义页数}} 每次请求发送15条数据
    const page = req.query.page;
    Number(page);

    const sql = `select * from project order by id desc limit 12 offset ${(page - 1) * 12} ;`    //必须先limit 再 offset
    // 使用准备好的整合sql的query函数
    SQLConnect(sql, null, (result) => {
        res.send({
            status: 200,
            result: result,
        })
    })
})

/**
 * 项目信息 模糊搜索数据
 */
router.get('/project/search', (req, res) => {
    const search = req.query.searchInfo;
    //修改为 生成带通配符的搜索模式（参数化用）
    const searchPattern = `%${search}%`;
    const sql = 'select * from project where \`name\` like ? or \`address\` like ? or \`remark\` like ? ';

    SQLConnect(sql, [searchPattern, searchPattern, searchPattern], (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result: result,
            })
        } else {
            res.send({
                status: 500,
                msg: "未找到结果",
            })
        }

    })
})
/**
 * 添加项目数据接口
 */
router.get('/project/add', (req, res) => {
    const name = req.query['addFromInfo[name]'] || "";
    const number = req.query['addFromInfo[number]'] || "";
    const money = req.query['addFromInfo[money]'] || "";
    const address = req.query['addFromInfo[address]'] || "";
    const duration = req.query['addFromInfo[duration]'] || "";
    const startTime = req.query['addFromInfo[startTime]'] || "";
    const endTime = req.query['addFromInfo[endTime]'] || "";
    const quantity = req.query['addFromInfo[quantity]'] || "";
    const status = req.query['addFromInfo[status]'] || "";
    const remark = req.query['addFromInfo[remark]'] || "";

    // 使用准备好的整合sql的query函数
    const sql = 'insert into project values (null,?,?,?,?,?,?,?,?,?,?)';
    const arr = [name, number, money, address, duration, startTime, endTime, quantity, status, remark];
    SQLConnect(sql, arr, (result) => {
        if (result.affectedRows > 0) {
            //受影响的条数大于0
            res.send({
                status: 200,
                msg: '添加成功'
            })
        } else {
            res.send({
                status: 500,
                msg: '添加失败'
            })
        }
    })
})

/**
 * 删除项目数据接口
 */
router.get('/project/del', (req, res) => {
    const id = req.query.id;
    const sql = 'delete from project where id=?';
    // 使用准备好的整合sql的query函数
    SQLConnect(sql, [id], (result) => {
        if (result.affectedRows > 0) {
            //受影响的条数大于0
            res.send({
                status: 200,
                msg: '删除成功'
            })
        } else {
            res.send({
                status: 500,
                msg: '删除失败'
            })
        }
    })
})

/**
 * 数据预处理接口
 */
router.get('/project/update/pre', (req, res) => {
    const id = req.query.id;
    const sql = 'select * from project where id=?'
    //
    SQLConnect(sql, [id], (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result: result
            })
        } else {
            res.send({
                status: 500,
                msh: '预处理失败'
            })
        }
    })
})

/**
 * 数据修改接口
 */

router.put('/project/update/:id', (req, res) => {
    const id = req.params.id;
    const { name, number, money, address, duration, startTime, endTime, quantity, status, remark } = req.body.editFromInfo;

    const sql = `UPDATE project SET name = ?, number = ?, money = ?, address = ?, duration = ?, startTime = ?, endTime = ?, quantity = ?, status = ?, remark = ? WHERE id = ?`
    const arr = [name, number, money, address, duration, startTime, endTime, quantity, status, remark, id];
    //
    SQLConnect(sql, arr, (result) => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: '项目信息修改成功'
            })
        } else {
            res.send({
                status: 500,
                msg: '项目信息修改失败'
            })
        }
    })

})
/**
 * 隧道设计信息 tree-一级
 */
router.get('/tunnel/list', (req, res) => {
    const sql = 'select * from tunnel';
    //
    SQLConnect(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result: result
            })
        } else {
            res.send({
                status: 500,
                msg: '暂无数据'
            })
        }
    })
})

/**
 * 隧道设计信息 tree-二级
 */
router.get('/tunnel/list/child', (req, res) => {
    const cid = req.query.cid;
    const sql = 'select * from tunnelchild where cid=?';
    //
    SQLConnect(sql, [cid], (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result: result
            })
        } else {
            res.send({
                status: 500,
                msg: '暂无数据'
            })
        }
    })
})

/**
 * 隧道设计信息 tree对应信息
 */
router.get('/tunnel/content', (req, res) => {
    const content = req.query.content;
    const sql = 'select * from tunnelcontent where content=?';
    //
    SQLConnect(sql, [content], (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result: result
            })
        } else {
            res.send({
                status: 500,
                msg: '暂无数据'
            })
        }
    })
})

/**
 * 隧道设计信息 文件上传接口
 * 文件上传
 * http://localhost:3000/api/upload
 */
//配置路径+名字
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./upload/")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
})
//封装“检查并创建文件夹”的工具函数（
var createFolder = function (folder) {
    try {
        fs.accessSync(folder);
    } catch (e) {
        fs.mkdirSync(folder);
    }
}
//创建实例 + 执行
var uploadFolder = './upload/';
createFolder(uploadFolder);
var upload = multer({ storage: storage });
//接收数据接口
router.post('/upload', upload.single('file'), (req, res, next) => {
  const file = req.file; // multer 已将文件信息注入 req.file  

  // 打印文件信息（日志）
  console.log('文件类型：%s', file.mimetype);
  console.log('原始文件名：%s', file.originalname);
  console.log('文件大小：%s 字节', file.size);
  console.log('文件保存路径：%s', file.path);

  // 响应 JSON 给前端
  res.json({ 
    res_code: '0',        // 业务自定义状态码（如 '0'=成功，'1'=失败）
    name: file.originalname, // 原始文件名
    url: file.path         // 服务器上文件的实际保存路径
  });
});

/**
 * 文件上传后设置预览链接
 */
router.get('/tunnel/content/updateUrl', (req, res) => {
    const id = req.query.id;
    const url = req.query.url;
    const sql = `update tunnelcontent set url=? where id=?`
    //
    SQLConnect(sql, [url,id], (result) => {
         if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: '上传成功'
            })
        } else {
            res.send({
                status: 500,
                msg: '上传失败'
            })
        }
    })
})
/**
 * 获取预览链接
 */
router.get('/tunnel/content/getUrl', (req, res) => {
    const id = req.query.id;
    const sql = 'select url from tunnelcontent where id=?';
    //
    SQLConnect(sql, [id], (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result: result
            })
        } else {
            res.send({
                status: 500,
                msg: '暂无数据'
            })
        }
    })
})

/**
 * 系统信息管理数据
 */
router.get('/system/list',(req,res) => {
    const sql = 'select * from user';
    //
    SQLConnect(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result: result
            })
        } else {
            res.send({
                status: 500,
                msg: '暂无数据'
            })
        }
    })
})

/**
 * 系统信息管理数据 模糊搜索
 */
router.get('/system/search', (req, res) => {
    const search = req.query.searchInfo;
    //修改为 生成带通配符的搜索模式（参数化用）
    const searchPattern = `%${search}%`;
    const sql = 'select * from user where \`username\` like ? or \`permission\` like ? or \`phone\` like ? ';
    //
    SQLConnect(sql, [searchPattern, searchPattern, searchPattern], (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result: result,
            })
        } else {
            res.send({
                status: 500,
                msg: "未找到结果",
            })
        }

    })
})

/**
 * 系统信息管理 添加用户
 */
router.get('/system/add',(req,res) =>{
    const username = req.query['addFromInfo[username]'] || "";
    const password = req.query['addFromInfo[password]'] || "";
    const permission = req.query['addFromInfo[permission]'] || "";
    const phone = req.query['addFromInfo[phone]'] || "";
        
    // 使用准备好的整合sql的query函数
    const sql = 'insert into user values (null,?,?,?,?)';
    const arr = [username,password,permission,phone];
    SQLConnect(sql, arr, (result) => {
        if (result.affectedRows > 0) {
            //受影响的条数大于0
            res.send({
                status: 200,
                msg: '添加成功'
            })
        } else {
            res.send({
                status: 500,
                msg: '添加失败'
            })
        }
    })
})

/**
 * 删除用户数据接口
 */
router.get('/system/del', (req, res) => {
    const id = req.query.id;
    const sql = 'delete from user where id=?';
    // 使用准备好的整合sql的query函数
    SQLConnect(sql, [id], (result) => {
        if (result.affectedRows > 0) {
            //受影响的条数大于0
            res.send({
                status: 200,
                msg: '删除成功'
            })
        } else {
            res.send({
                status: 500,
                msg: '删除失败'
            })
        }
    })
})

/**
 * 编辑用户数据预处理
 */
router.get('/system/update/pre', (req, res) => {
    const id = req.query.id;
    const sql = 'select * from user where id=?'
    //
    SQLConnect(sql, [id], (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result: result
            })
        } else {
            res.send({
                status: 500,
                msh: '预处理失败'
            })
        }
    })
})

/**
 * 编辑用户数据
 */
router.put('/system/update/:id', (req, res) => {
    const id = req.params.id;
    const { username, password, permission, phone } = req.body.editFromInfo;

    const sql = `update user set username = ?, password = ?, permission = ?, phone = ? WHERE id = ?`
    const arr = [username, password, permission, phone, id];
    //
    SQLConnect(sql, arr, (result) => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: '用户信息修改成功'
            })
        } else {
            res.send({
                status: 500,
                msg: '用户信息修改失败'
            })
        }
    })

})
module.exports = router