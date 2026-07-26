## 一、基础数据结构的构造器

### 1. Array.from() 和 Array.of()

```javaScript
// Array.from() - 将可迭代对象转为数组
const set = new Set([1, 2, 3]);
const arrayFromSet = Array.from(set);
console.log(arrayFromSet); // [1, 2, 3]

// 自定义可迭代对象
const range = {
  *[Symbol.iterator]() {
    for (let i = 1; i <= 3; i++) yield i;
  }
};
console.log(Array.from(range)); // [1, 2, 3]

// 使用映射函数
console.log(Array.from(range, x => x * 2)); // [2, 4, 6]
```


### 2. new Set() 和 Set 方法

```javaScript
// Set 构造器接受可迭代对象
const array = [1, 2, 3, 3, 2];
const setFromArray = new Set(array);
console.log(setFromArray); // Set(3) {1, 2, 3}

// 自定义可迭代对象
const uniqueChars = new Set('hello');
console.log(uniqueChars); // Set(4) {'h', 'e', 'l', 'o'}

// Set 方法
const set1 = new Set([1, 2, 3]);
const set2 = new Set([2, 3, 4]);

// 并集
const union = new Set([...set1, ...set2]);
console.log(union); // Set(4) {1, 2, 3, 4}

// 交集
const intersection = new Set([...set1].filter(x => set2.has(x)));
console.log(intersection); // Set(2) {2, 3}
```

### 3. new Map() 和 Map 方法

```javaScript
// Map 构造器接受 [key, value] 对的可迭代对象
const entries = [
  ['name', 'Alice'],
  ['age', 25],
  ['city', 'New York']
];
const mapFromEntries = new Map(entries);
console.log(mapFromEntries.get('name')); // 'Alice'

// 自定义可迭代对象
const dynamicEntries = {
  *[Symbol.iterator]() {
    yield ['id', 1];
    yield ['status', 'active'];
    yield ['score', 95];
  }
};
const dynamicMap = new Map(dynamicEntries);
console.log(dynamicMap.get('score')); // 95

// Map 转对象
console.log(Object.fromEntries(dynamicMap)); // {id: 1, status: 'active', score: 95}
```

### 4. new WeakSet() 和 new WeakMap()
```javaScript
// WeakSet 构造器
const obj1 = { id: 1 };
const obj2 = { id: 2 };
const obj3 = { id: 3 };

const weakSet = new WeakSet([obj1, obj2, obj3]);
console.log(weakSet.has(obj1)); // true

// WeakMap 构造器
const weakMap = new WeakMap([
  [obj1, 'data1'],
  [obj2, 'data2']
]);
console.log(weakMap.get(obj1)); // 'data1'
```



## 二、字符串和正则表达式 API

### 1. String.fromCodePoint()

```javaScript
// 从 Unicode 代码点的可迭代对象创建字符串
const codePoints = [0x68, 0x65, 0x6C, 0x6C, 0x6F]; // 'hello'
const strFromCodePoints = String.fromCodePoint(...codePoints);
console.log(strFromCodePoints); // 'hello'

// 使用生成器
function* generateUnicode() {
  yield 0x1F600; // 😀
  yield 0x1F604; // 😄
  yield 0x1F603; // 😃
}
const emojiString = String.fromCodePoint(...generateUnicode());
console.log(emojiString); // '😀😄😃'
```


### 2. RegExp 构造函数

```javaScript
// 从可迭代对象构建模式数组
const patterns = [/hello/, /world/];
const combinedPattern = new RegExp(
  patterns.map(p => p.source).join('|')
);
console.log(combinedPattern.test('hello')); // true
console.log(combinedPattern.test('world')); // true
```

## 三、类型化数组

### 1. new TypedArray()

```javaScript
// 所有 TypedArray 构造器都接受可迭代对象
const int8Array = new Int8Array([1, 2, 3, 4]);
console.log(int8Array); // Int8Array(4) [1, 2, 3, 4]

// 使用自定义可迭代对象
const float32Array = new Float32Array({
  *[Symbol.iterator]() {
    yield 1.1;
    yield 2.2;
    yield 3.3;
  }
});
console.log(float32Array); // Float32Array(3) [1.1, 2.2, 3.3]

// 从其他可迭代对象创建
const setForArray = new Set([10, 20, 30]);
const uint16Array = new Uint16Array(setForArray);
console.log(uint16Array); // Uint16Array(3) [10, 20, 30]
```

### 2. ArrayBuffer 和 DataView

```javaScript
// DataView 配合 TypedArray
const buffer = new ArrayBuffer(16);
const view = new DataView(buffer);
const values = new Uint8Array([1, 2, 3, 4]);

// 将可迭代对象的值写入 DataView
let offset = 0;
for (const value of values) {
  view.setUint8(offset, value);
  offset++;
}
```


## 四、Promise API

### 1. Promise.all()

```javaScript
// 接受可迭代的 Promise 对象
const urls = ['/api/user', '/api/posts', '/api/comments'];
const promises = urls.map(url => fetch(url));

Promise.all(promises)
  .then(responses => Promise.all(responses.map(r => r.json())))
  .then(data => console.log('所有数据:', data));

// 自定义可迭代的 Promise
const promiseIterable = {
  *[Symbol.iterator]() {
    yield Promise.resolve(1);
    yield Promise.resolve(2);
    yield Promise.resolve(3);
  }
};

Promise.all(promiseIterable)
  .then(results => console.log(results)); // [1, 2, 3]
```

### 2. Promise.race(), Promise.allSettled(), Promise.any()

```javaScript
// Promise.race() - 第一个解决或拒绝的
const racePromises = {
  *[Symbol.iterator]() {
    yield new Promise(resolve => setTimeout(() => resolve('Fast'), 100));
    yield new Promise(resolve => setTimeout(() => resolve('Slow'), 500));
  }
};

Promise.race(racePromises)
  .then(result => console.log('Winner:', result)); // 'Fast'

// Promise.allSettled() - 所有 Promise 完成（无论成功失败）
const mixedPromises = [
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Another success')
];

Promise.allSettled(mixedPromises)
  .then(results => console.log('All settled:', results));

// Promise.any() - 第一个成功的 Promise
Promise.any(mixedPromises)
  .then(firstSuccess => console.log('First success:', firstSuccess));
```

## 五、Object 相关 API

### 1. Object.fromEntries()

```javaScript
// 将 [key, value] 对的可迭代对象转为对象
const entries = new Map([
  ['name', 'Bob'],
  ['age', 30],
  ['city', 'Paris']
]);
const obj = Object.fromEntries(entries);
console.log(obj); // {name: 'Bob', age: 30, city: 'Paris'}

// 自定义 entries 可迭代对象
const dynamicEntries = {
  *[Symbol.iterator]() {
    for (let i = 0; i < 3; i++) {
      yield [`key${i}`, `value${i}`];
    }
  }
};
console.log(Object.fromEntries(dynamicEntries));
// {key0: 'value0', key1: 'value1', key2: 'value2'}
```

### 2. Object.assign()（间接使用）

```javaScript
// 虽然 Object.assign 不接受可迭代对象，但可以配合展开运算符
const source1 = { a: 1, b: 2 };
const source2 = { b: 3, c: 4 };

// 使用 Map 的 entries
const mapEntries = new Map([['d', 5], ['e', 6]]);
const merged = Object.assign({}, source1, source2, Object.fromEntries(mapEntries));
console.log(merged); // {a: 1, b: 3, c: 4, d: 5, e: 6}
```

## 六、集合运算和工具函数

### 1. Math.max() 和 Math.min()

```javaScript
// 配合扩展运算符使用可迭代对象
const numbers = new Set([10, 20, 5, 30, 15]);
console.log(Math.max(...numbers)); // 30
console.log(Math.min(...numbers)); // 5

// 生成器函数
function* generateNumbers() {
  yield* [1, 2, 3, 4, 5];
  yield* [6, 7, 8, 9, 10];
}
console.log(Math.max(...generateNumbers())); // 10
```

### 2. 函数调用参数
```javaScript
// 使用扩展运算符传递可迭代对象作为参数
function sum(a, b, c, d) {
  return a + b + c + d;
}

const numberIterable = {
  *[Symbol.iterator]() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
  }
};

console.log(sum(...numberIterable)); // 10

// apply 的现代替代
console.log(sum.apply(null, [...numberIterable])); // 10
```

## 七、新的 JavaScript 特性

### 1. Array.prototype 方法（ES6+）

```javaScript
// flat() 和 flatMap()
const nestedIterable = {
  *[Symbol.iterator]() {
    yield [1, 2];
    yield [3, 4];
    yield [5, 6];
  }
};

const nestedArray = Array.from(nestedIterable);
console.log(nestedArray.flat()); // [1, 2, 3, 4, 5, 6]

// 使用 flatMap
const result = nestedArray.flatMap(arr => arr.map(x => x * 2));
console.log(result); // [2, 4, 6, 8, 10, 12]
```

### 2. for-await-of 循环（异步可迭代）

```javaScript
// 异步可迭代对象
const asyncIterable = {
  async *[Symbol.asyncIterator]() {
    for (let i = 0; i < 3; i++) {
      await new Promise(resolve => setTimeout(resolve, 100));
      yield i;
    }
  }
};

(async () => {
  for await (const value of asyncIterable) {
    console.log('Async value:', value);
  }
})();
// 依次输出: Async value: 0, Async value: 1, Async value: 2
```

## 八、实际应用示例

### 1. 数据流处理管道

```javaScript
// 创建数据处理管道
function* dataGenerator() {
  for (let i = 0; i < 100; i++) {
    yield { id: i, value: Math.random() };
  }
}

// 使用多个接受可迭代对象的 API
const processedData = Array.from(dataGenerator())
  .filter(item => item.value > 0.5)
  .map(item => ({ ...item, value: item.value * 100 }));

console.log('Processed:', processedData.length, 'items');
```

### 2. 配置管理

```javaScript
// 从多个配置源合并
const configSources = {
  *[Symbol.iterator]() {
    yield new Map([['theme', 'dark'], ['language', 'en']]);
    yield new Map([['notifications', true], ['language', 'zh']]);
    yield { fontSize: 14, theme: 'light' };
  }
};

// 合并配置
const finalConfig = Object.assign(
  {},
  ...Array.from(configSources).map(source => 
    source instanceof Map ? Object.fromEntries(source) : source
  )
);

console.log('Final config:', finalConfig);
// 后面的配置会覆盖前面的相同属性
```

### 3. 路由系统

```javaScript
class Router {
  constructor() {
    this.routes = new Map();
  }

  addRoutes(iterable) {
    for (const [path, handler] of iterable) {
      this.routes.set(path, handler);
    }
  }

  *getAllRoutes() {
    for (const [path, handler] of this.routes) {
      yield { path, handler: handler.name };
    }
  }
}

// 使用
const router = new Router();
const routeEntries = [
  ['/', () => console.log('Home')],
  ['/about', () => console.log('About')],
  ['/contact', () => console.log('Contact')]
];

router.addRoutes(routeEntries);

// 获取所有路由信息
console.log([...router.getAllRoutes()]);
```

## 九、检测可迭代对象
```javaScript
// 检测对象是否可迭代
function isIterable(obj) {
  return obj != null && 
         typeof obj[Symbol.iterator] === 'function';
}

// 检测对象是否异步可迭代
function isAsyncIterable(obj) {
  return obj != null && 
         typeof obj[Symbol.asyncIterator] === 'function';
}

// 使用检测
console.log(isIterable([]));           // true
console.log(isIterable('hello'));      // true
console.log(isIterable(new Map()));    // true
console.log(isIterable({}));           // false
console.log(isIterable(123));          // false
```