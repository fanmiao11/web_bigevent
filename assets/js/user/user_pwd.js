$(function(){
    const form = layui.form

    form.verify({
        pwd:[/^[\S]{6,12}$/,"密码必须6-12位，且不能出现空格"],
        samePwd: (value) => {
            if (value === $('[name=oldPwd]').val()) return "新密码不能和原密码相同"
        },
        rePwd:(value) => {
            if (value !== $('[name=newPwd]').val()) return '确认密码和新密码不相同';
        }
    })

    $('.layui-form').on('submit', function (e) {
      e.preventDefault();
    //   console.log(111);
      console.log($(this).serialize());
      $.ajax({
          type:'POST',
          url:'/my/updatepwd',
          data:$(this).serialize(),
          success:(res) => {
              // console.log(res);
              if (res.status !==0) return layer.msg(res.message)

              layer.msg('更新密码成功')
              localStorage.removeItem('token')
              window.parent.location.href = '/login.html'
          }
      })
    });


})