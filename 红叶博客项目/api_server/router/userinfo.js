const express= require("express");

 const router= express.Router();

 //导入验证数据的中间件

 const expressjoi=require("@escook/express-joi");

 //导入验证更新用户信息的规则

 const {update_userinfo_schema,update_password_schema,update_avatar_schema}=require("../schems/user");



 //挂载路由

//导入路由处理函数模块
    const uerinfo_handle=require("../router_handler/userinfo");
//获取用户信息路由
    router.get('/userinfo',uerinfo_handle.getUserinfo);

//更新用户数据路由

    router.post('/userinfo',expressjoi(update_userinfo_schema),uerinfo_handle.updateUserInfo);

//更新密码的路由
    
    router.post('/updatapwd',expressjoi(update_password_schema),uerinfo_handle.update_password);

//更换头像的路由

    router.post('/update/avatar',expressjoi(update_avatar_schema),uerinfo_handle.updateAvatar);

 module.exports=router;