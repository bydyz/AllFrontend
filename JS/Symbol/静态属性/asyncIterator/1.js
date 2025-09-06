// Symbol.asyncIterator 符号指定了一个对象的默认异步迭代器。
// 如果一个对象设置了这个属性，它就是异步可迭代对象，可用于for await...of循环



// 自定义异步可迭代对象
//   你可以通过设置[Symbol.asyncIterator]属性来自定义异步可迭代对象。


const myAsyncIterable = new Object();
myAsyncIterable[Symbol.asyncIterator] = async function* () {
  yield "hello";
  yield "async";
  yield "iteration!";
};

(async () => {
  for await (const x of myAsyncIterable) {
    console.log(x);
    // expected output:
    //    "hello"
    //    "async"
    //    "iteration!"
  }
})();