$(function () {
  // 入口函数
  // --------------------------  切换登录和注册的盒子 -------------
  // 点击去注册
  // console.log($('.zxc'));
  $(".login a").click(function () {
    $(".login").hide();
    $(".register").show();
  });

  // 点击去登录
  $(".register a").click(function () {
    $(".register").hide();
    $(".login").show();
  });

  // -----------------------------   表单验证  --------------
  // 1. 加载表单（form）模块
  let form = layui.form;

  // 2. 使用form.verify()方法实现表单验证
  form.verify({
    pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],

    // 要求对确认密码框内容和密码框的内容保持一致
    //  步骤：
    //  1. 先获取 确认密码框内容
    //  2. 密码框的内容
    //  3. 比较两者内容是否一致
    repass: function (value, item) {
      // console.log(value, item); value 就是确认密码框内容   item 确认密码框是DOM元素

      // 注意细节：获取的密码框一定是注册form表单中的密码框
      let pwd = $(".register [name=password]").val();

      // console.log(value, pwd);

      if (value !== pwd) {
        // 说明两次密码不一致
        return "两次密码不一致";
      }

      // return "提示框的内容";
    },
  });

  // 注册表单提交功能
  $(".register form").on("submit", function (e) {
    console.log(123);
    // 阻止表单的默认行为
    e.preventDefault();

    // 获取表单中的数据 ==> serialize是根据表单各项的name属性获取值的，所以要检查表单各项的name属性
    let data = $(this).serialize();
    // console.log(data);
    axios.post("/api/reguser", data).then((res) =>{
        console.log(res);
      // 实现弹框 layer.msg("只想弱弱提示");
      if (res.data.status !==0) {

       return layer.msg(res.data.message)
      }
        // 注册成功
        layer.msg("注册成功")
    })
  });

        // 提交给接口，完成登录。登录成功，
        $(".register form").on("submit", function (e) {
          // console.log(123);
          // 阻止表单的默认行为
          e.preventDefault();
      
          // 获取表单中的数据 ==> serialize是根据表单各项的name属性获取值的，所以要检查表单各项的name属性
          let data = $(this).serialize();
          // console.log(data);
          axios.post("/api/reguser", data).then((res) =>{
              // console.log(res);
            // 实现弹框 layer.msg("只想弱弱提示");
            if (res.data.status !==0) {
      
             return layer.msg(res.data.message)
            }
              // 注册成功
              layer.msg("注册成功")
              $(".register a").click()
          })
        });

        // 登录ajax
        $(".login form").on("submit", function (e) {
          console.log(123);
          // 阻止表单的默认行为
          e.preventDefault();
      
          // 获取表单中的数据 ==> serialize是根据表单各项的name属性获取值的，所以要检查表单各项的name属性
          let data = $(this).serialize();
          // console.log(data);
          axios.post("/api/login", data).then((res) =>{
              // console.log(res);
            // 实现弹框 layer.msg("只想弱弱提示");
            if (res.data.status !==0) {
      
             return layer.msg(res.data.message)
            }

            
            layer.msg("登录成功,即将跳转去首页",function () {
              location.href = "/home/index.html"
            })
            localStorage.setItem("token", res.data.token);

          })
        });






});
