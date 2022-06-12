$(function(){
  const form = layui.form;

  // 初始化富文本编辑器
  initEditor();
  // 获取文章分类
  const initCate = () => {
    $.ajax({
      type: 'GET',
      url: '/my/article/cates',
      success: (res) => {
        if (res.status != 0) return layer.msg('获取文章分类');
        const htrmStr = template('tpl-cate', res);
        $('[name=cate_id]').html(htrmStr);
        form.render('select');
      },
    });
  };
  initCate();

  // 1. 初始化图片裁剪器
  var $image = $('#image');

  // 2. 裁剪选项
  var options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview',
  };

  // 3. 初始化裁剪区域
  $image.cropper(options);

  //   选择封面
  $('#btnChooseImage').on('click', function () {
    $('#coverFile').click();
  });

  // 监听 coverFile 的 change 事件，获取用户选择的文件列表
  $('#coverFile').on('change', function (e) {
    // 获取到文件的列表数组
    var files = e.target.files;
    // 判断用户是否选择了文件
    if (files.length === 0) {
      return;
    }
    // 根据文件，创建对应的 URL 地址
    var newImgURL = URL.createObjectURL(files[0]);
    // 为裁剪区域重新设置图片
    $image
      .cropper('destroy') // 销毁旧的裁剪区域
      .attr('src', newImgURL) // 重新设置图片路径
      .cropper(options); // 重新初始化裁剪区域
  });

  let art_state = '已发布'; 
  $('#btnSave2').click(function(){
    art_state = '草稿'
  })


  $('#form-pub').on('submit', function (e) {
    // 1. 阻止表单的默认提交行为
    e.preventDefault();
    // 2. 基于 form 表单，快速创建一个 FormData 对象
    var fd = new FormData($(this)[0]);
    // 3. 将文章的发布状态，存到 fd 中
    fd.append('state', art_state);

    // console.log(fd.get('title'));
    // console.log(fd.get('cate_id'));
    // console.log(fd.get('content'));
    // console.log(fd.get('state'));
    // 4. 将封面裁剪过后的图片，输出为一个文件对象
    $image
      .cropper('getCroppedCanvas', {
        // 创建一个 Canvas 画布
        width: 400,
        height: 280,
      })
      .toBlob(function (blob) {
        // 将 Canvas 画布上的内容，转化为文件对象
        // 得到文件对象后，进行后续的操作
        // 5. 将文件对象，存储到 fd 中
        fd.append('cover_img', blob);
        // 6. 发起 ajax 数据请求
          publishArticle(fd);
      });

  });

  function publishArticle(fd){
    $.ajax({
      method: 'POST',
      url: '/my/article/add',
      data: fd,
      // 注意：如果向服务器提交的是 FormData 格式的数据，
      // 必须添加以下两个配置项
      contentType: false,
      processData: false,
      success: (res) => {
        if (res.status !== 0) return layer.msg('文章发布失败！');
        layer.msg('文章发布成功！');
        location.href='/article/art_list.html'
        // 通知父页面修改高亮
        window.parent.change()
      },
    });
  }



})