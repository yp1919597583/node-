//导入验证规则包
const joi=require('joi');

//定义博客验证规则

const name=joi.string().required();
const alias=joi.string().required().max(1000).min(20);
const artic_title=joi.string().required();
exports.reg_artic={
    body:{
        name,
        alias,
        artic_title
    }
}