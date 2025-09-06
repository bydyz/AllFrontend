const myIterable = {};
myIterable[Symbol.iterator] = function* () {
    yield 1;
    yield 2;
    yield 3;
};

for (let value of myIterable) {
    console.log(value); // 输出: 1, 2, 3
}