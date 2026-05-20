//！   类构造函数重载


class Point {
  x: number;
  y: number;

  // 重载签名
  constructor();
  constructor(x: number, y: number);
  constructor(coords: [number, number]);
  constructor(obj: { x: number; y: number });

  // 实现签名
  constructor(arg1?: any, arg2?: any) {
    if (arg1 === undefined && arg2 === undefined) {
      this.x = 0;
      this.y = 0;
    } else if (typeof arg1 === 'number' && typeof arg2 === 'number') {
      this.x = arg1;
      this.y = arg2;
    } else if (Array.isArray(arg1) && arg1.length === 2) {
      this.x = arg1[0];
      this.y = arg1[1];
    } else if (typeof arg1 === 'object' && arg1.x !== undefined && arg1.y !== undefined) {
      this.x = arg1.x;
      this.y = arg1.y;
    } else {
      throw new Error('Invalid constructor arguments');
    }
  }

  toString(): string {
    return `Point(${this.x}, ${this.y})`;
  }
}

// 使用不同的构造方式
const point1 = new Point();           // 默认 (0, 0)
const point2 = new Point(10, 20);     // 数字参数
const point3 = new Point([30, 40]);   // 数组参数
const point4 = new Point({ x: 50, y: 60 }); // 对象参数

console.log(point1.toString()); // "Point(0, 0)"
console.log(point2.toString()); // "Point(10, 20)"
console.log(point3.toString()); // "Point(30, 40)"
console.log(point4.toString()); // "Point(50, 60)"



export {}