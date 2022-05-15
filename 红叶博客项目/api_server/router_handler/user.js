//处理user请求

//导入数据库操作模块
  const db=require("../db/index")
//导入加密密码模块
  const bcryptjs=require("bcryptjs");
const { off } = require("../db/index");

//导入生成token的包
    const jwt=require("jsonwebtoken");

//导入秘钥
   const config=require("../config");

//导入文件回传模块

    const fs=require("fs");
const { url } = require("inspector");
const router = require("../router/user");





//注册新用户的处理函数
exports.regUser=(req,res)=>{
    //获取用户提交信息
    const userinfo=req.body
    
    //检验表单有无空数据
    // if(!userinfo.userName || !userinfo.password){
    //         return res.send({
    //             status:1,
    //             message:"注册失败用户名或密码为空"
    //         })
    // }

    
    //1.定义sql语句查询，查询用户名或邮箱是否存在
    const sql="select * from ev_user where username=?"
     //检查邮箱是否已经存在
        const sql_byEmail="select * from ev_user where email=?"
    db.query(sql,userinfo.userName,function(err,results){
        // if(err){
        //     return res.send({status:1,message:err.message})//执行sql失败
        // }

        //执行成功，判断用户名是否被占用
        if(results.length>0){
           
            return res.send({status:1,message:"用户名已存在!"});

        }else if(results.length <=0){

            db.query(sql_byEmail,userinfo.email,(err2,result2)=>{
                // if(err2){
                    
                //     return res.send({status:1,message:err2.message})
                // }
    
                if(result2.length>0){
                    return res.send({status:1,message:"邮箱已被使用!"});
    
                }




                   //用户名邮箱都可以使用
        //1.对密码加密，再存入数据库（使用bcryptjs包）先安装 npm i bcryptjs@2.4.3
        //2.调用bcryptjs.hashSync() 加密
        userinfo.password= bcryptjs.hashSync(userinfo.password,10)
        // console.log(userinfo.password);//(明文密码,随机盐长度)
         //插入新用户
         const sql_into="insert into ev_user set?";
         db.query(sql_into,{username:userinfo.userName,passwor:userinfo.password,email:userinfo.email},(err,result)=>{
             if(err){
                 return res.send({status:1,message:err.message})
             }
             //判断影响行数是否为一，不为一则失败
             if(result.affectedRows !=1){
                 return res.send({status:1,message:"注册用户失败,稍后再试"});
 
             }
             res.send({status:0,message:"注册成功!"})
 
         });




            })

        }

        
     
        
      
    })



    
}


//登录的处理函数
exports.login=(req,res)=>{
    //接收表单数据
    const userinfo=req.body;
    //1.定义sql
    const sql="select * from ev_user where username=?"
    //2.执行sql
    db.query(sql,userinfo.userName,(err,result)=>{
        //执行失败
        if(err){
            return res.cc(err);
        }
        //没查到用户数据
        if(result.length !==1){
            return res.cc("登录失败,没有此用户!");
        }
        //判断密码是否正确,调用bcryptjs.compareSync()
        const comperResult= bcryptjs.compareSync(userinfo.password,result[0].passwor);
        if(!comperResult){
            return res.cc("登录失败,密码错误");
        }

        //在服务端生成token字符串（生成token时要剔除敏感信息,比如密码等）
        //利用es6的高级语法（展开运算符）清空  const user={...result[0],password:'',user_pic:''}
        const user={...result[0],passwor:'',email:'',user_pic:''};
        //加密用户信息生成token
        const tokenStr=jwt.sign(user,config.jwtScrectKey,{expiresIn:config.expiresIn});
       // console.log(tokenStr);
        //将token响应客户端  
        res.send({
            status:0,
            message:"登陆成功",
            token:'Bearer '+tokenStr,//加上前缀方便客户端使用（前缀是固定写法）
           
        });
       
     

    })

    
}


