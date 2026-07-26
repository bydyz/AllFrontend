// 1. 基本类数组对象
const arrayLike = {
    0: 'first',
    1: 'second',
    2: 'third',
    length: 3
};
Array.prototype.forEach.call(arrayLike, item => console.log(item))

console.log('------------------------')

// 转换为数组
const arr = Array.from(arrayLike); // ['first', 'second', 'third']





// 2. 带迭代器的类数组对象（可以使用扩展运算符）
const iterableArrayLike = {
    0: 'a',
    1: 'b',
    2: 'c',
    length: 3,
    [Symbol.iterator]: function* () {
        for (let i = 0; i < this.length; i++) {
            yield this[i];
        }
    }
};

console.log([...iterableArrayLike]); // ['a', 'b', 'c']





// 3. 可写的类数组对象
const mutableArrayLike = {
    data: [1, 2, 3, 4, 5],
    get length() {
        return this.data.length;
    },
    set length(value) {
        this.data.length = value;
    }
};

// 添加索引访问器
for (let i = 0; i < 5; i++) {
    Object.defineProperty(mutableArrayLike, i, {
        get() {
            return this.data[i];
        },
        set(value) {
            this.data[i] = value;
        },
        enumerable: true
    });
}

// 现在可以像数组一样使用
mutableArrayLike[0] = 100;
console.log(mutableArrayLike[0]); // 100