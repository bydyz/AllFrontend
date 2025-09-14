# 总述

虽然自定义迭代器是一个有用的工具，但由于需要显式地维护其内部状态，因此创建时要格外谨慎。
生成器函数（Generator 函数）提供了一个强大的替代选择：它允许你定义一个非连续执行的函数作为迭代算法。
生成器函数使用 function* 语法编写。


最初调用时，生成器函数不执行任何代码，而是返回一种称为生成器的特殊迭代器。
通过调用 next() 方法消耗该生成器时，生成器函数将执行，直至遇到 yield 关键字。


可以根据需要多次调用该函数，并且每次都返回一个新的生成器，但每个生成器只能迭代一次。


我们现在可以调整上面的例子了。此代码的行为并没有改变，但更容易编写和阅读。


```javascript
function* makeRangeIterator(start = 0, end = Infinity, step = 1) {
  let iterationCount = 0;
  for (let i = start; i < end; i += step) {
    iterationCount++;
    yield i;
  }
  return iterationCount;
}
```