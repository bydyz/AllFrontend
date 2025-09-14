// 语法
//   var timeInMs = Date.now();

// 返回值
//   一个 Number，表示自 UNIX 纪元开始（1970 年 1 月 1 日 00:00:00 (UTC)）到当前时间的毫秒数。

// 描述
//   因为 now() 是 Date 的一个静态函数，所以必须以 Date.now() 的形式来使用。
//   Date.now() 方法返回自 1970 年 1 月 1 日 00:00:00 (UTC) 到当前时间的毫秒数。



// This example takes 2 seconds to run
const start = Date.now();

console.log("starting timer...", start);
// Expected output: "starting timer... ms数"

setTimeout(() => {
  const millis = Date.now() - start;

  console.log(`seconds elapsed = ${Math.floor(millis / 1000)}`);
  // Expected output: "seconds elapsed = 2"
}, 2000);