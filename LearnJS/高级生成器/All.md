# 概述

生成器会按需计算它们 yield 的值，这使得它们能够高效地表示一个计算成本很高的序列，甚至是前文所示的一个无限序列。

next() 方法也接受一个参数用于修改生成器内部状态。传递给 next() 的参数值会被 yield 接收。

  备注： 传给第一个 next() 的值会被忽略。

下面的是斐波那契数列生成器，它使用了 next(x) 来重启序列：

```javascript
function* fibonacci() {
  let current = 0;
  let next = 1;
  while (true) {
    const reset = yield current;
    [current, next] = [next, next + current];
    if (reset) {
      current = 0;
      next = 1;
    }
  }
}

const sequence = fibonacci();
console.log(sequence.next().value); // 0
console.log(sequence.next().value); // 1
console.log(sequence.next().value); // 1
console.log(sequence.next().value); // 2
console.log(sequence.next().value); // 3
console.log(sequence.next().value); // 5
console.log(sequence.next().value); // 8
console.log(sequence.next(true).value); // 0
console.log(sequence.next().value); // 1
console.log(sequence.next().value); // 1
console.log(sequence.next().value); // 2
```

你可以通过调用其 throw() 方法强制生成器抛出异常，并传递应该抛出的异常值。这个异常将从当前挂起的生成器的上下文中抛出，就好像当前挂起的 yield 是一个 throw value 语句。

如果该异常没有在生成器内部被捕获，则它将通过 throw() 的调用向上传播，对 next() 的后续调用将导致 done 属性为 true。

生成器的 return() 方法可返回给定的值并终结这个生成器。