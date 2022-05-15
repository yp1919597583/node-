layui.use(['element', 'layer', 'util'], function(){
    var element = layui.element
    ,layer = layui.layer
    ,util = layui.util
    ,$ = layui.$;
    //头部事件
    util.event('lay-header-event', {
      //左侧菜单事件
      menuLeft: function(othis){
        layer.msg('展开左侧菜单的操作', {icon: 0});
      }
      ,menuRight: function(){
        layer.open({
          type: 1
          ,content: '<div style="padding: 15px;">处理右侧面板的操作</div>'
          ,area: ['260px', '100%']
          ,offset: 'rt' //右上角
          ,anim: 5
          ,shadeClose: true
        });
      }
    });
    
  });
                //判断用户是否登录
          if(!localStorage.getItem("token") ){
                  alert("你还未登录,请登录!")
                  window.location.href="/index.html";
                }else{
  
  
                    
              $.ajax(
            {
              url:"http://127.0.0.1:8080/my/userinfo",
              type:"get",
              dataType:"json",
             
              error:function(){
                console.log("获取用户信息失败!");
              
              },
  
              success:function(datas){
                if(datas.status==0){
                localStorage.setItem("userinfo",JSON.stringify(datas.data))
                $("#my_name").html( JSON.parse(localStorage.getItem("userinfo")).username ) 
               
              if(JSON.parse(localStorage.getItem("userinfo")).user_pic){
                let img=JSON.parse(localStorage.getItem("userinfo")).user_pic;
                $("#my_name").append(`<img src=${img} class="layui-nav-img " id="my_img">`)
              }else{
                $("#my_name").append('<img src="26f23203a2c3e1fdc5883eb6c6cda03c.jpeg" class="layui-nav-img " id="my_img">')
              }
              }
              else{
                alert("登录过期,请重新登录!")
                window.location.href="/index.html"
              }
              },
              headers:{ Authorization:JSON.parse(localStorage.getItem("token"))}
            }
            )
                }
  
                   //退出登录
             $("#cancel_login").on("click",()=>{
              window.location.href='/ht.html';
              localStorage.clear()
                        
  
              })
  
              
            
                //修改密码
                $('#modifyPwd').on("click",()=>{
                  layui.use('layer', function(){
                    var layer = layui.layer;
                    layer.open({
                        type: 1,
                        title: '密码修改',
                        closeBtn: 1,
                        anim: 4,
                        shadeClose: false,
                        content: `
                        <div class="layui-form-item">
                        <label class="layui-form-label">旧密码:</label>
                        <div class="layui-input-inline">
                          <input type="password" name="password" required lay-verify="required" placeholder="请输入旧密码" autocomplete="off" class="layui-input old_pwd">
                        </div> 
                      </div>
  
                     
  
                      <div class="layui-form-item">
                        <label class="layui-form-label">新密码:</label>
                        <div class="layui-input-inline">
                          <input type="password" name="password" required lay-verify="required" placeholder="请输入新密码" autocomplete="off" class="layui-input new_pwd">
                        </div>
                        
                      </div>
                      
                      <div class="layui-form-item">
                        <div class="layui-input-block">
                          <button class="layui-btn" lay-submit lay-filter="formDemo" id="modified_pwd">修改密码</button>
                          <button type="reset" id="clear" class="layui-btn layui-btn-primary">重置</button>
                        </div>
                      </div>
  
                    `//这个只在这个函数作用域生效
                                        });

              $("#clear").on('click',function(){
                //注意这里用jquery是不行的
                document.querySelector(".new_pwd").value=''
                document.querySelector(".old_pwd").value=''
              })

              $('#modified_pwd').on('click',function(){
                if($('.old_pwd').val()==''){
                    layer.tips('旧密码不能为空!', '.old_pwd', {
                        tips: [1, '#FF5722'],
                        time: 3000
                      });
                      return false;
                   }else if($('.new_pwd').val()=='' || $('.new_pwd').val().length<6){
                    layer.tips('请输入6-12位新密码!', '.new_pwd', {
                        tips: [1, '#FF5722'],
                        time: 3000
                      });
                      return false;
                   }
  
                    $.ajax({
                      url:'http://localhost:8080/my/updatapwd',
                      type:'post',
                      dataType:'json',
                      data:{
                        oldPwd:$('.old_pwd').val(),
                        newPwd:$('.new_pwd').val()
                      },
                      error:function(data){
                       
                        alert("密码修改成功,请重新登录!")
                           window.location.href='/ht.html';
                          localStorage.removeItem("token");
                          localStorage.removeItem("userinfo");
                         
                        
                      },
                      success:function(data){
                       
                        if(data.status==1 && data.message==`"oldPwd" with value "${$('.old_pwd').val()}" fails to match the required pattern: /^[\\S]{6,12}$/`){
                          layer.tips('旧密码输入错误!', '.old_pwd', {
                          tips: [1, '#FF5722'],
                          time: 3000
                          });
                        }else if(data.message=='旧密码输入错误!'){
                          layer.tips('旧密码输入错误!', '.old_pwd', {
                          tips: [1, '#FF5722'],
                          time: 3000
                          });
                        } else if(data.message=="\"newPwd\" contains an invalid value"){
                          console.log("成功:"+JSON.stringify(data));
                          layer.tips('新旧密码一样!', '.new_pwd', {
                          tips: [1, '#FF5722'],
                          time: 3000
                          });
                        }
  
                      },
                      headers:{ Authorization:JSON.parse(localStorage.getItem("token"))}
                    })
                    
                  })
  
                  });              
                    
                })
  
              
               //修改头像
                $('#modify_avatar').on('click',()=>{
                  layui.use('layer', function(){
                    var layer = layui.layer;
  
                    layer.open({
                    title:'修改头像',
                    type: 1,
                    skin: 'layui-layer-demo',
                    closeBtn: 1, 
                    anim: 2,
                    shadeClose: false,
                    content: `    
                    
                    <div class="layui-form-item">
                        <label class="layui-form-label">新头像</label>
                        <div class="layui-input-inline" id='img_name'>
                         
                        </div>
                        
                      </div>
                      <div class="layui-form-item">
                        <div class="layui-input-block">
                        
                        <button type="button" class="layui-btn" id="post_img">
                                  <i class="layui-icon">&#xe67c;</i>上传图片
                                </button>
                                <button class="layui-btn" lay-submit lay-filter="formDemo" id='testListAction'>提交</button>
                                </div>
                      </div>                 
                                `
                  });
                  var upload = layui.upload;
                  let src;
                        upload.render({
                              elem: '#post_img'
                              ,auto: false //选择文件后不自动上传
                              ,size:200
                              ,accept: 'images' 
                              ,choose: function(obj){
                                var files = obj.pushFile();
                                obj.preview(function(index, file, result){
                                  src=result;
                                  $('#img_name').html(JSON.stringify(file.name));
                                 //  console.log(result); //得到文件base64编码，比如图片
  
                                });
                              }
                            });      
  
                            $('#testListAction').on('click',()=>{
                              $.ajax({
  
                              url: 'http://127.0.0.1:8080/my/update/avatar',
                              type:'post',
                              dataType:'json',
                              data:{
                                avatar:src
                              },
                              error:function(err){
                                alert("更新失败")
  
                              },
                              success:(data)=>{
                                $.ajax({
                                  url:'http://localhost:8080/my/userinfo',
                                  type:'get',
                                  dataType:'json',
                                  error:()=>{
                                    alert('未知错误!')
                                  },
                                  success:(data)=>{
                                    localStorage.setItem("userinfo",JSON.stringify(data));
                                    window.location.href='/ht.html'
                                  },
                                  headers:{
                                    Authorization:JSON.parse(localStorage.getItem('token'))
                                  }
                                })
  
                              },
                              headers:{
                                Authorization:JSON.parse(localStorage.getItem('token'))
                              }
  
                              })
                                 })
                           })
  
                       })
  
                     
  
                       //查看头像
                       
              //浏览量统计  
              let bt=document.querySelector(".bt");
              let trafficEcharts=echarts.init(bt);
                /*5.对ECharts进行一些配置*/
      var option = {
        //柱子颜色
  
          color:["#FF5722"],
  
          // 设置图表的标题
          title: {
              text: '最受欢迎博客类型统计'
          },
          // 设置图表的图例
          legend: {
              data:['累计访问人数']
          },
          // 设置X轴上显示的数据
          xAxis: {
          type: 'category',
          data: ['springBoot', 'nginx', 'javaSE', 'web前端', '阿里一面']
      },
      yAxis: {
          type: 'value'
      },
      series: [{
          name:'累计访问人数',
          data: [10032, 31502, 1320, 1901, 50324,],
          type: 'bar',
          label: {
                  show: true,
                  position: 'top'
              },
  
              //定义柱子颜色
              // itemStyle:{
              //   normal:{
              //     color:function(params){
              //       var colorList=['#009688','#5FB878','#393D49','#1E9FFF','#FFB800'];
              //       return colorList[params.]
              //     }
              //   }
              // }
      }
    ]};
  
      /*6.将配置传递给ECharts*/
      trafficEcharts.setOption(option);
   
      //搜索热度图
  
    let date=  new Date();
      let zx=document.querySelector(".zx");
      let hot_echarts=echarts.init(zx);
     var option2={
      //提示框
      tooltip: {
          trigger: 'item',
          triggerOn: 'click',
          formatter: function (arg) {
              return arg.name+'-' + arg.data
          }
      },
  
      title: {
              text: '搜索热度统计'
          },
          //设置图例
          legend: {
              data:['springBoot', 'nginx', 'javaSE', 'web前端', '阿里一面']
          },
          //数值显示
          label:{
            show:true
          },
      xAxis: {
      type: "category",
      data: [date.getFullYear()+'年'+(date.getMonth()+1)+'月'+(date.getDate()-2)+"日",date.getFullYear()+'年'+(date.getMonth()+1)+'月'+(date.getDate()-1)+"日", date.getFullYear()+'年'+(date.getMonth()+1)+'月'+date.getDate()+"日"],
      
    },
    yAxis: {
      type: "value",
    },
    series: [
      //平滑线条  smooth:true
      
  
      {
        name:'springBoot',
        type: "line",
        data: [1200, 2366, 7344],
        smooth:true
      },
      {
        name:'nginx',
        type: "line",
        data: [10231, 9234, 4531],
        smooth:true
      },
      {
        name:'javaSE',
        type: "line",
        data: [300, 8220, 3785],
        smooth:true
      },
      {
        name:'web前端',
        type: "line",
        data: [1200, 13210, 2795],
        smooth:true
      },
      {
        name:'阿里一面',
        type: "line",
        data: [12098, 32452, 23453],
        smooth:true
      },
    ],
  
      }
      hot_echarts.setOption(option2);

//博客管理
   
            