# 总述

在 JavaScript 中，迭代器是一个对象，它定义一个序列，并在终止时可能附带一个返回值。

迭代器是通过使用 next() 方法实现了迭代器协议的任何一个对象



# 返回值

具有两个属性的对象
  value
    迭代序列的下一个值。

  done
    如果已经迭代到序列中的最后一个值，则它为 true。如果 value 和 done 一起出现，则它就是迭代器的返回值。



# 过程
一旦创建，迭代器对象可以通过重复调用 next() 显式地迭代。迭代一个迭代器被称为消耗了这个迭代器，因为它通常只能执行一次：在产生终值后，对 next() 的额外调用应该继续返回 {done：true}。

Javascript 中最常见的迭代器是数组迭代器，它按顺序返回关联数组中的每个值。

虽然很容易想象所有迭代器都可以表示为数组，但事实并非如此。数组必须完整分配，而迭代器则是按需分配。因此，迭代器可以表示无限大小的序列，例如 0 和 Infinity 之间的整数范围。

下面的例子展示了具体做法。它允许你创建一个简单的范围迭代器，以定义一个从 start（闭）到 end（开），以 step 为步长的整数序列。它的最终返回值是它创建的序列的大小，由变量 iterationCount 跟踪。

```javascript
function makeRangeIterator(start = 0, end = Infinity, step = 1) {
  let nextIndex = start;
  let iterationCount = 0;

  const rangeIterator = {
    next() {
      let result;
      if (nextIndex < end) {
        result = { 
          value: nextIndex, 
          done: false 
        };
        nextIndex += step;
        iterationCount++;
        return result;
      }
      return { 
        value: iterationCount, 
        done: true 
      };
    },
  };
  return rangeIterator;
}
```


使用这个迭代器看起来像这样：

```javascript
let it = makeRangeIterator(1, 10, 2);

let result = it.next();
while (!result.done) {
  console.log(result.value); // 1 3 5 7 9
  result = it.next();
}

console.log(`已迭代序列的大小：${result.value}`); // 5
```