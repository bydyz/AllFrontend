# 总述

若一个对象拥有迭代行为，比如在 for...of 中会循环一些值，那么那个对象便是一个可迭代对象。一些内置类型，如 Array 或 Map 拥有默认的迭代行为，而其他类型（比如 Object）则没有。

为了实现可迭代，对象必须实现 [Symbol.iterator]() 方法，这意味着这个对象（或其原型链中的任意一个对象）必须具有一个键值为 Symbol.iterator 的属性。

程序员应知道一个可迭代对象可以多次迭代，还是只能迭代一次。

只能迭代一次的可迭代对象（例如生成器）通常从它们的 [Symbol.iterator]() 方法中返回 this，而那些可以多次迭代的方法必须在每次调用 [Symbol.iterator]() 时返回一个新的迭代器。


```javascript
function* makeIterator() {
  yield 1;
  yield 2;
}

const it = makeIterator();

for (const itItem of it) {
  console.log(itItem);
}

console.log(it[Symbol.iterator]() === it); // true

// 这个例子向我们展示了生成器（迭代器）是可迭代对象，
// 它有一个 [Symbol.iterator]() 方法返回 it（它自己），
// 因此，it 对象只能迭代*一次*。

// 如果我们将它的 [Symbol.iterator]() 方法改为一个返回新的迭代器/生成器对象的函数/生成器，
// 它（it）就可以迭代多次了。

it[Symbol.iterator] = function* () {
  yield 2;
  yield 1;
};
```





# 自定义的可迭代对象

我们可以像这样实现自己的可迭代对象：

```javascript
var myIterable = {
  *[Symbol.iterator]() {
    yield 1;
    yield 2;
    yield 3;
  },
};
```

自定义的可迭代对象可用 for...of 循环或者展开语法进行迭代。

```javascript
for (let value of myIterable) {
  console.log(value);
}
// 1
// 2
// 3

[...myIterable]; // [1, 2, 3]
```





# 内置可迭代对象

String、Array、TypedArray、Map 和 Set 都是内置可迭代对象，因为它们的原型对象都拥有一个 Symbol.iterator 方法。





# 用于可迭代对象的语法

一些语句和表达式专用于可迭代对象，例如 for...of 循环、展开语法、yield* 和解构语法。

```javascript
for (let value of ["a", "b", "c"]) {
  console.log(value);
}
// "a"
// "b"
// "c"

[..."abc"]; // ["a", "b", "c"]

function* gen() {
  yield* ["a", "b", "c"];
}

gen().next(); // { value: "a", done: false }

[a, b, c] = new Set(["a", "b", "c"]);
a; // "a"
```