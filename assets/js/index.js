function getUserInfo() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    // headers : {
    //     Authorization : localStorage.getItem('token')
    // },
    success: (res) => {
      // console.log(res);
      if (res.status !== 0) return layer.msg(res.message);

      layer.msg('获取用户信息成功！');

      // 调用渲染函数
      renderAvator(res.data);
    },

  });
}


  // 渲染用户信息
  
  const renderAvator = (user) => {
    const name = user.nickname || user.username;
  
    $('#welcome').html(`欢迎${name}`);
    if (user.user_pic !== null) {
      $('.layui-nav-img').attr('src',user.user_pic).show()
      $('.text-avatar').hide()
    } else {
      $('.layui-nav-img').hide()
      let first = name[0].toUpperCase()
      $('.text-avatar').html(first).show()
    }
  };
  
  // 获取用户列表
  getUserInfo();
  
  // 退出登录
  
  $('#btnLogout').click(() => {
  
    layer.confirm('是否退出登录？', { icon: 3, title: '提示' }, function (index) {
      localStorage.removeItem('token');
      location.href = '/login.html';
    });
  
  });

  // 切换高亮
  function change(){
    $('#change').addClass('layui-this').next().removeClass('layui-this')
  }






  let flag=1
$('.right-per').on('click', 'dd',function(){

  if (
    $(this).children().attr('class') !==
    ('right-per-info' || 'right-per-avatar' || 'right-per-repwd')
  ) {
    // console.log(1);
    flag = 0;
  } else {
    flag = 1;
  }

  if (flag) {
    $('.left-per').click()
    flag = 0
  }
// console.log($(this).children().attr('class'));
// if ($(this).children().attr('class') === ('right-per-info' || 'right-per-avatar' || 'right-per-repwd' )) {

//   // console.dir(typeof($('.left-per').attr('class')));//string

//   if (!$('.left-per').attr('class=layui-nav-itemed')) {
//     $('.left-per').addClass('layui-nav-itemed')
//   }
// }else{
//   $('.left-per').removeClass('layui-nav-itemed');
// }

  // $('.left-per')
  //   .children()
  //   .eq(1).children()
  //   .eq($(this).index())
  //   .children()
  //   .children()
  //   .click();
  $('.left-per').parent().siblings('dl').children().eq($(this).index()).children().children().click()

});