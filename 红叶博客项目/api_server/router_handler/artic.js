//导入数据库库操作模块
const db=require('../db/index')
//导入加密文章模块
const bcryptjs=require('bcryptjs')
//保存文章路由处理函数
exports.save_artic=(req,res)=>{
    
    const artic_imfomation=req.body;
    
    //对文章内容加密(应该不用加密)
  //  artic_imfomation.alias=bcryptjs.hashSync(artic_imfomation.alias,10);
    //定义sql
    const sql="INSERT INTO ev_article_cate  set ? "
    //执行sql
    db.query(sql,{name:artic_imfomation.name,alias:artic_imfomation.alias,username:req.user.username,artic_title:artic_imfomation.artic_title},(err,result)=>{
        
        //sql执行失败
        if(err){
            return res.cc(
                {
                std_flag:1,
                message:err.message});
        }
        //sql执行成功，但是影响行数不为一
        if(result.affectedRows !=1){
            return res.cc("发布博客失败!");
        }
        res.send({
            status:0,
            message:'发布成功!'
        })
    })
}



//获取用户博客信息处理函数

exports.get_artic=function(req,res){
    //定义查询博客信息的sql
    const sql="SELECT * FROM ev_article_cate WHERE username=?"
    //执行sql
    db.query(sql,req.user.username,(err,result)=>{
        if(err){

            return res.cc(err.message);
           
        }
        
        res.send({
            code:0,
            msg:"成功",
            data:result});
        
    })


}


//删除博客的处理函数
exports.delete_artic=function(req,res){
    //定义sql
    const sql="DELETE FROM ev_article_cate WHERE id=?";
    //执行sql失败
    db.query(sql,req.body.Id,(err,result)=>{
        if(err){
            return res.cc(err.message);
        }
        if(result.affectedRows !=1){
            return res.cc("删除失败!");
        }

        res.send({
            status:0,
            message:"删除成功!"
        })
        

    })

    

}
//获取一种博客的所有
    exports.grt_all_artic_byclass=function(req,res){
        //定义sql
        const sql=`SELECT * FROM ev_article_cate WHERE NAME=?`
     
        //执行sql
        db.query(sql,req.query.name,(err,result)=>{
            //sql执行失败
            if(err){

                return res.cc(err.message);

            }
            //sql执行成功
            
            res.send({
                status:0,
                boke:result
            })

        })
    }
