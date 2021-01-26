$(function () {
    // 发送 ajax 请求
    let form = layui.form;

    function getUserInfo() {
        axios.get("/my/userinfo").then(res=>{
            // console.log(res);
        //给表单赋值
        //form 即 class="layui-form" 所在元素属性 lay-filter="" 对应的值
        form.val("form",res.data.data) 

        })

    }
            getUserInfo()

    // 表单验证
    form.verify({

        // 对用户昵称做个长度限制
        nickname:function (value) {
            // console.log(value);
            
            if (value.length>6) {
                return "昵称长度要在1到6个字符"
            }
        }

    })

    $("#form").on("submit",function (e) {
        
        e.preventDefault()

        let data =$(this).serialize()
        // console.log(data);

        axios.post("/my/userinfo",data).then((res)=>{

            // console.log(res);
            if (res.data.status !==0) {
                // 更新失败
                return layer.msg("修改用户信息失败")
                
            }
                // 更新成功
    
            layer.msg ("修改用户信息成功")


            window.parent.getUserInfo()
        })
    })

    // 重置功能
    $("#resetBtn").click(function (e) {
        e.preventDefault()
        // 再次发送ajax请求,获取用户信息,重新填充到表单中
        getUserInfo()
    })
    
    
})