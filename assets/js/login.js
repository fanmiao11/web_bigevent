$(function () {
  // 点击去注册账号让 登录框隐藏，注册框显示
  $('#link_reg').click(() => {
      $('.login-box').hide()
      $('.reg-box').show()
  })
  // 点击去登录让 注册框隐藏，登录框显示
  $("#link_login").click(() => {
    $(".login-box").show();
    $(".reg-box").hide();
  });
  
//   引入layui的form
    const form = layui.form

    form.verify({
        password:[/^[\S]{6,12}/,"密码必须6-12位，且不能出现空格"],
        repwd : (value) => {
            const pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) return "两次密码不一致"

        }
    })

    // const layer = layui.layer

    // const baseUrl = 'http://www.liulongbin.top:3007'

    // 注册提交
    $('#form_reg').submit((e) => {
        e.preventDefault()
        $.ajax({
            type:'POST',
            url:'/api/reguser',
            data:{
                username: $("#form_reg [name=username").val(), 
                password: $("#form_reg [name=password").val(),
            },
            success: (res) => {
                if(res.status !== 0) return layer.msg(res.message)
                layer.msg("注册成功！");
                // 注册成功后跳转到登录界面
                $("#form_reg")[0].reset()
                $("#link_login").click();
            }
        })
    })


    // 监听登录表单提交事件
    $(' #form_login').submit((e) => {
        e.preventDefault()
        $.ajax({
            type:'POST',
            url:'/api/login',
            data:$('#form_login').serialize(),
            success:(res) => {
                if (res.status !== 0) return layer.msg('登陆失败！')
                layer.msg('登录成功！')
                localStorage.setItem('token',res.token)
                location.href = '/index.html'
            }
        })
    })



});
