const express=require("express");
const app=express();
const joi=require("joi");

//静态资源托管，让用户可以访问服务器资源

app.use(express.static('page'))
app.use(express.static('layui'))
app.use(express.static('img'))
app.use(express.static('js_tool'))
//导入cors对象
    const cors= require("cors");
    app.use(cors());

    //配置解析表单数据的中间件
    app.use(express.urlencoded({extended:false}))//只能解析x-www-form-url编码的格式\
    
    //封装cc函数
    app.use((req,res,next)=>{
       
        res.cc=function(err,status=1){
            //status 默认为1失败
            //err的值可能是错误对象，也可能是错误信息字符串
            res.send({
                status,
                message: err instanceof Error ? err.message:err
            })
        }
        next();
    })


    //配置解析token的中间件(一定要在路由之前配置)
    const expressJwt= require("express-jwt");
    const config=require("./config");
    app.use(expressJwt({secret:config.jwtScrectKey}).unless({path:[/^\/api/]}))//配置全局中间件解密token并排除以/api开头的路由，不需要身份验证


 
 

//导入并使用用户路由
    const userRouter= require("./router/user")
    app.use('/api',userRouter)//今后访问/user时都必须在访问前加上/api
//导入并使用博客路由
    const articRouter=require('./router/boke')
    app.use('/myArtic',articRouter)
//导入并使用用户信息的模块
    const userInfoRouter=require("./router/userinfo");
    app.use('/my',userInfoRouter);//挂载到全局并加上/my前缀

//在路由之后定义错误级别的中间件（错误中间件必须写next）
    app.use((err,req,res,next)=>{
        if(err instanceof joi.ValidationError){
            //验证失败的错误
            res.cc(err);
        }
        //token验证失败
        if(err.name==="UnauthorizedError"){
            return res.cc("身份认证失败!");
        }
        //未知错误
    res.cc(err);//貌似现在可以不用  return 嘿嘿! 笔者未报错
    })
    app.listen(8080,function(){
        console.log("api 服务器启动 http://localhost:8080");
    })