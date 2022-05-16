const express=require("express");
const router=express.Router();
//导入用户路由处理函数
const userHandel= require("../router_handler/user");
//1.导入用户验证的中间件

const express_jio=require("@escook/express-joi");

//2.导入需要的验证规则对象
const {reg_login_schems}=require("../schems/user")//得到对象中的一个属性 {reg_login_schems}

//注册
router.post("/reguser",express_jio(reg_login_schems),userHandel.regUser)//相当于类
//登录
router.post("/login",express_jio(reg_login_schems),userHandel.login)//验证通过之后才会继续调用userHandel.login
//获取用户名,头像,作品,用于展示
// router.get("/get_other_info",userHandel.getSomeInfo)
module.exports=router
