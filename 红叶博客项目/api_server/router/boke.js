
const express= require('express')
const router=express.Router()
//导入路由处理函数
const articHandel=require('../router_handler/artic')

//引入验证规则
const schem_artic=require('../schems/artic')

//导入验证插件
const express_jio=require('@escook/express-joi')
//发布博客路由
router.post('/create_artic',express_jio(schem_artic.reg_artic),articHandel.save_artic)

//获取用户博客信息路由
router.get('/get_my_artic',articHandel.get_artic);

//获取一个种类的所有博客
router.get('/get_allartic_byclass',articHandel.grt_all_artic_byclass);

//删除博客路由
router.post('/delete_artic',articHandel.delete_artic)
module.exports=router;