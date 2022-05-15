//导入mysql
const mysql=require("mysql");
const db=mysql.createPool({
    host:"127.0.0.1",
    user:"root",
    password:"yp18783819559",
    database:"nodejs"
})



//向外界暴露db，供使用
module.exports=db;