//导入定义验证规则的包
const joi= require("joi");


//定义用户名，密码，邮箱的验证规则(注意:此处定义的变量名必须与参数上的一致)

const userName=joi.string().min(1).max(12).required()//.alphanum()限制必须是字母与数字

const password=joi.string().alphanum().pattern(/^[\S]{6,12}$/).required()//定义正则表达式

const email=joi.string().email();



//定义，id nickname,email 验证规则

const id=joi.number().integer().min(1).required();
const nickName=joi.string().required();


//定义验证头像的验证规则


const avatar=joi.string().dataUri().required();//dataUri() 表示必须是base64的字符串



//向外暴露一个用来验证的规则

//定义验证注册和登录表单验证的规则
exports.reg_login_schems={
    body:{
        userName,
        password,
        email
    },

}


//更新用户信息验证

exports.update_userinfo_schema={
    //需要对req.body的数据验证
    body:{
        id:id,
        nickName:nickName,
        email:email
    }
}

//更新密码验证

exports.update_password_schema={
    body:{
        oldPwd:password,
        newPwd:joi.not(joi.ref('oldPwd')).concat(password) 

        /*
        
        1.joi.ref('oldPwd')表示 新密码与旧密码一致
        2.joi.not(joi.ref('oldPwd'))表示 新密码与旧密码不一致
        3.concat(password) 表示合并password验证规则
        
        
        */
    }

}

//向外共享，验证头像的规则

exports.update_avatar_schema={
    //验证body中数据的合法性
    body:{
        avatar,//参数名，与验证规则名重名可省略
    }

}
