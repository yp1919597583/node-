//导入大数据库操作模块
const db=require("../db/index");

//导入比较加密密码的模块

const bcryptjs= require("bcryptjs");


//获取用户信息的路由模块,处理函数
exports.getUserinfo=(req,res)=>{

//定义sql
const sql="select id,username,nickName,email,user_pic from ev_user where id=?"
//调用db.qurey()查询
db.query(sql,req.user.id,(err,result)=>{
    if(err){

        //执行sql失败

        return res.cc(err);
    }
    //执行sql成功,但是查询结果不唯一
    if(result.length !=1){
        return res.cc("获取用户信息失败!");
    }
    //用户信息获取成功!
   
    res.send({
        status:0,
        message:"获取用户信息成功!",
        data:result[0]   // 用户信息
    })
});



   
}



//更新用户基本信息

exports.updateUserInfo=(req,res)=>{
    //定义sql语句
    const sql_update="update ev_user set ? where id=?"
    //调用db.query()执行
    db.query(sql_update,[req.body,req.body.id],(err,result)=>{

        //执行sql失败
        if(err){
            return res.cc(err);
        }
        //执行成功但是影响行数不唯一
        if(result.affectedRows !=1){
            return res.cc("修改信息失败!")

        }
        res.send({
            status:0,
            message:"更新成功!"})
    })

  

}

//更新密码
    exports.update_password=(req,res)=>{
       
      
        //定义sql语句
        const sql_update_password_select="select * from ev_user where id=?"
        //执行sql
        db.query(sql_update_password_select,req.user.id,(err,result)=>{
        //sql执行失败
            if(err){
                return res.cc(err);
            }
        //执行sql成功,但是影响行数不唯一
            if(result.length !=1){
                return res.cc("修改密码失败,用户不存在!");
            }

        //判断旧密码是否正确
             
        let compareResult=bcryptjs.compareSync(req.body.oldPwd,result[0].passwor);//不能直接用==判断（加密了）
      
        if(compareResult==false){
               
         return   res.cc("旧密码输入错误!");

        }
        
        //将密码加密后更新到数据库

        const sql_update_password_update="update ev_user set passwor=? where id=?"

        //对新密码加密

        const newPwd=bcryptjs.hashSync(req.body.newPwd,10);
        db.query(sql_update_password_update,[newPwd,req.user.id],(err,result)=>{

            //sql执行失败

            if(err){
             return   res.cc(err);
            }
            //执行sql成功但是影响行数不为一
            if(result.affectedRows !=1){
                
             return   res.cc("修改密码失败!");

            }

            res.send("修改成功!");
        })
        
               
        });
    }

    
//更换头像的处理函数

exports.updateAvatar=(req,res)=>{
    //定义sql
    const sql="update ev_user set user_pic=? where id=?"

    //执行sql

    db.query(sql,[req.body.avatar,req.user.id],(err,result)=>{
        //注:avatar必须与验证规则里面的验证参数同名
    //执行sql失败
        if(err){
            return res.cc(err);
        }
    
    //执行sql成功，但影响行数不为1

        if(result.affectedRows !==1){

            return res.cc("更新头像失败!");

        }
    
    //更新成功

        res.send({
            status:0,
            message: "头像更新成功!"
            
        });

        
    

    });

}
