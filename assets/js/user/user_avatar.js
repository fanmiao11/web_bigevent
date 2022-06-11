$(function(){
  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image');
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview',
  };

  // 1.3 创建裁剪区域
  $image.cropper(options);

  $('#btnChooseImage').on('click', function () {
    $('#file').click();
  });

  $('#file').change((e) => {
    //   console.log(e);
    const fileLen = e.target.files.length
    if (fileLen ===0 ) return

    const file = e.target.files[0]
    const imgUrl = URL.createObjectURL(file)
    $image
    .cropper('destroy')
    .attr('src',imgUrl)
    .cropper(options)
  })
  $('#btnUpload').click(() => {
      const dataURL = $image
      .cropper('getCroppedCanvas',{
          width:100,
          height:100,
      })
      .toDataURL('image/png')

      
        $.ajax({
          type: 'POST',
          url: '/my/update/avatar',
          data: {
              avatar:dataURL,
          },
          success: (res) => {
            if (res.status !== 0) return layer.msg(res.message);
            layer.msg('上传成功！')
            window.parent.getUserInfo()
          },
        });
  })

})