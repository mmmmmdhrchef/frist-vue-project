// 修改1：引入 mysql2 而不是 mysql
const mysql = require('mysql2'); // 主要修改这里

const MySQLObj = {
    host: 'localhost', // 数据库地址
    user: 'root',
    password: '123456',
    database: 'itbaizhan',  // 填写你的数据库名称
}

// 修改2：使用 mysql.createPool 而不是 createPool
// 修改3：修正变量名拼写 (poor → pool)
const pool = mysql.createPool(MySQLObj); // 主要修改这里

// 这个函数用于整合 SQL 连接数据库的过程
function SQLConnect(sql, arr, callback) { // 修改4：修正函数名拼写
    // 修改5：使用正确的 API 名称 getConnection
    pool.getConnection((err, connection) => { // 主要修改这里
        // 如果获取连接有报错信息 
        if (err) {
            console.log('连接出现错误');
            return;
        }
        
        // 执行 sql 语句
        /*  
            sql: SQL 语句
            arr: SQL 语句的占位符参数
            使用 ? 占位符防止 SQL 注入 
            就是sql中 ? 的地方 当执行查询时，数据库将arr中的参数值安全地“填充”到预编译好的SQL结构对应占位符上
        */
        
        // 修改6：修正变量名 (connention → connection)
        connection.query(sql, arr, (err, result) => {
            // 释放连接（获取完毕就释放，减轻服务器压力）
            connection.release(); // 修改7：修正变量名
            
            if (err) {
                console.log(err);
                return;
            }
            callback(result); //使用的时候用于判断出来的结果 如果length为0 说明没结果好吧
        });
    });    
}

// 修改8：修正导出语句的拼写和空格
module.exports = SQLConnect;