
$("#post_artic").on('click',function(){
 
//  axios.defaults.baseURL="http://localhost:8080";

  layui.use("layer",()=>{
        let layer=layui.layer;
      })
    if($("#title").val() ==''){
        layer.msg("标题不能为空")
        return false;
    }else  if($("#artic_nr").val().length<20){
      
      layer.msg('内容过少,请补充');
        return false;

    }else{
     // 这里我们通过axios发送请求，出现问题（可能是value问题）
    
    // axios({
    //   method:"post",
    //   url:'/myArtic/create_artic',
    //   headers:{
    //   Authorization:JSON.parse(localStorage.getItem("token")) 
    //   },
    //   //请求体
    //   data:{
    //     artic_title:$("#title").val(),
    //     name:$(".layui-form-radioed>div").html(),
    //    //$(".layui-form-radioed>div").html()
    //    alias:$("#artic_nr").val()
    //   }
    // }).then((resData)=>{
    //   console.log(resData.data);


    // })
    
    //换用jquery成功

    $.ajax({
      url:"http://localhost:8080/myArtic/create_artic",
      type:"post",
      dataType:'json',
      data:{
        artic_title:$("#title").val(),
        name:$(".layui-form-radioed>div").html(),
        alias:$("#artic_nr").val()
      },
      error:function(err){
        console.log(err);
        layer.alert('发布失败', {
            title:'未知错误',
            skin: 'layui-layer-lan',
            closeBtn: 0
          })
      },
      success:function(data){

        layer.config({
          extend: 'skin/style.css', //加载您的扩展样式
          skin: 'layer-ext-myskin'
        });
        if(data.status==0){
          layer.alert('发布成功', {
            title:'结果',
            skin: 'layui-layer-molv',
            anim:3,
            closeBtn: 0
          })
        }else{
        layer.alert('发布失败', {
          title:'结果',
          skin: 'layer-ext-myskin',
          anim:3,
          closeBtn: 0
        })
      }
        
      },
      headers:{
       // Content:application/x-www-form-urlencoded,
       // Content-Type: 
        Authorization:JSON.parse(localStorage.getItem("token")) 
      }
    })
  //  console.log($(".layui-form-radioed").parent().val());
    }

})
//清空
$('#reset').on('click',()=>{
      $('#artic_nr').val('');
    })
