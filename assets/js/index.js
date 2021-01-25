// 发送ajax请求来获取到用户的信息
function getUserInfo() {
    axios
  .get("/my/userinfo", {
    // headers: {
    //   Authorization: localStorage.getItem("token"),
    // },
  })
  .then((res) => {
    // console.log(res);
    // 判断
    if (res.data.status !== 0) {
      return layer.msg("获取用户信息失败");
    }
    // 获取用户信息成功 ==> 处理头像和昵称
    avatarAndName(res.data);
  });
}
getUserInfo()

        // 处理头像和昵称
        function avatarAndName(res) {

    // 处理名字（优先级：优先展示nickname
    let name = res.data.nickname || res.data.username

        $("#welcome").text("欢迎 " + name)

        // 2. 头像（优先使用图片、没有图片使用name）

        console.log(res);
        if (res.data.user_pic) {
             // 如果有自己的头像，展示，隐藏文字头像
             $(".layui-nav-img").attr("src", res.data.user_pic).show();
            $(".text_avatar").hide();
        }else{
           // 没有自己的头像，隐藏，展示文字头像
        $(".layui-nav-img").hide();
    // 文字头像的文字是名字的第一个字符的大写
        let first = name[0].toUpperCase();
        $(".text_avatar").text(first).show();

        }
}

    $("#logoutBtn").click(function () {
        // 弹框-询问是否退出

        layer.confirm('确定退出登录?', {icon: 3, title:'提示'}, function(index){
            //do something
            
            localStorage.removeItem("token")
            location.href ="/home/login.html"
            layer.close(index);
      });
        
    })