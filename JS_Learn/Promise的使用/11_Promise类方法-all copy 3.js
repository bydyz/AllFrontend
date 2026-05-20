// 如果传入的是空数组，Promise.all 会立即以一个空数组解决。

Promise.all([])
    .then(results => {
        console.log(results); // 输出: []
    });