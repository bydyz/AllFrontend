const onBackToParent = () => {
  // 方法1: 使用URL对象（推荐）
  try {
    const currentUrl = location.href;

    // 移除文件名部分
    const newUrl = currentUrl.replace(/\/[^\/]*\.html?$/, "");

    // 跳转到新URL
    window.location.href = newUrl;
  } catch (e) {
    console.log(e);
  }
};

window.MyUtils = {
  onBackToParent
};
