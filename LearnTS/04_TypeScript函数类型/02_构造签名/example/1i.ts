// 调用签名（普通函数）
interface Callable {
  (x: number, y: number): number;
}

// 构造签名（构造函数）
interface Constructable {
  new (x: number, y: number): Point;
}

class Point {
  constructor(public x: number, public y: number) {}
}

// 使用区别
const add: Callable = (a, b) => a + b;
const result = add(2, 3); // 5

const PointConstructor: Constructable = Point;
const point = new PointConstructor(10, 20); // Point 实例



export {}