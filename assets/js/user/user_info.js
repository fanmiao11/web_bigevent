$(function () {
  const form = layui.form;
  form.verify({
    nickname: (val) => {
      if (val.length > 6) return '昵称长度不能超过6个字符';
    },
  });

  // 获取用户信息
  const initUserInfo = () => {
    $.ajax({
      method: 'GET',
      url: '/my/userinfo',

      success: (res) => {
        if (res.status !== 0) return res.message;

        form.val('formUserInfo', res.data);
      },
    });
  };
  initUserInfo();
  $('#btnReset').click((e) => {
      e.preventDefault();
      initUserInfo()
  })

  $('.layui-form').submit( function (e){
      e.preventDefault()
      $.ajax({
        type: 'POST',
        url: '/my/userinfo',
        data:$(this).serialize(),
        success:(res) => {
            if (res.status !== 0) return layer.msg('信息更新失败！')
            layer.msg('更新信息成功！')
            window.parent.getUserInfo()
        }
      });
  })

});
