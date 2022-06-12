$(function () {
  const form = layui.form;
  const initArtCateList = () => {
    $.ajax({
      type: 'GET',
      url: '/my/article/cates',
      success: (res) => {
        if (res.status !== 0) return layer.msg(res.message);

        const htmlStrl = template('tpl-table', res);
        $('tbody').empty().html(htmlStrl);
      },
    });
  };
  // 获取文章分类列表
  initArtCateList();

  //   给添加按钮绑定点击事件
  let indexAdd;
  $('#btnAddCate').click(() => {
    indexAdd = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '添加文章分类',
      content: $('#dialog-add').html(),
    });
  });

  // 通过事件委托，添加文章分类
  $('body').on('submit', '#form-add', function (e) {
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: '/my/article/addcates',
      data: $(this).serialize(),
      success: (res) => {
        if (res.status !== 0) return layer.msg(res.message);

        layer.msg('添加文章分类成功');
        initArtCateList();
        // 关闭弹窗
        layer.close(indexAdd);
      },
    });
  });

  // 通过代理方式，为 btn-edit 按钮绑定点击事件
  let indexEdit = null;

  $('tbody').on('click', '.btn-edit', function () {
    // 弹出修改文章分类的弹窗
    indexEdit = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '修改文章分类',
      content: $('#dialog-edit').html(),
    });

    const id = $(this).attr('data-id');
    // 发起请求获取对应分类的数据
    $.ajax({
      method: 'GET',
      url: '/my/article/cates/' + id,
      success: function (res) {
        if (res.status !== 0) return layer.msg(res.message);

        form.val('form-edit', res.data);
      },
    });
  });

  // 确认修改
  $('body').on('submit', '#form-edit', function (e) {
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: '/my/article/updatecate',
      data: $(this).serialize(),
      success: (res) => {
        if (res.status !== 0) return layer.msg(res.message);

        layer.msg('修改成功！');
        initArtCateList();
        layer.close(indexEdit);
      },
    });
  });

  $('tbody').on('click', '.btn-delete', function () {
    const id = $(this).attr('data-id');
    layer.confirm("确认删除？",{ icon: 3, title: '提示' }, (index) => {
      $.ajax({
        type: 'GET',
        url: '/my/article/deletecate/' + id,
        success: (res) => {
          if (res.status !== 0) return layer.msg(res.message);
          layer.msg('删除成功！');
          initArtCateList();
          layer.close(index);
        },
      });
    });
  });
});
