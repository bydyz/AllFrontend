async function fetchData() {
  try {
    const result = await new Promise((resolve) => {
      setTimeout(() => resolve('成功'), 1000);
    });
    console.log(result); // 输出: '成功'
  } catch (error) {
    console.error(error);
  }
}

fetchData();



