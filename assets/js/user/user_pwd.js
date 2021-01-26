$(function () {

    let form = layui.form;

    form.verify({


      // pass 密码的校验
    pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],

    // 对新密码对校验
    newPwd: function (value) {
      // value 新密码的内容

      // 获取到原密码，和新密码进行比较，如果两者是相同的，需要出现提示
      let oldPwd = $("[name=oldPwd]").val();
      console.log(oldPwd, value);

      if (oldPwd === value) {
        return "新旧密码不能相同";
      }
    },
        // 确认新密码的校验

        reNewPwd:  function (value) {
            // 判断确认密码是否和新密码一致,给出提示
            let newPwd =$("[name=newPwd]").val()

            if (newPwd!==value) {
                
                return "两次输入的密码不一致"
                
            }
        }


    })
    
})