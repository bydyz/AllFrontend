abstract class Shape {
  // 抽象属性
  abstract readonly color: string;
  abstract area: number;
  abstract perimeter: number;
  
  // 具体方法
  describe(): void {
    console.log(`This is a ${this.color} shape with area ${this.area} and perimeter ${this.perimeter}`);
  }
  
  // 抽象方法
  abstract calculateArea(): number;
  abstract calculatePerimeter(): number;
}

class Circle extends Shape {
  // 实现抽象属性
  readonly color: string;
  private _radius: number;
  
  // 计算属性实现抽象属性
  get area(): number {
    return this.calculateArea();
  }
  
  get perimeter(): number {
    return this.calculatePerimeter();
  }
  
  constructor(color: string, radius: number) {
    super();
    this.color = color;
    this._radius = radius;
  }
  
  // 实现抽象方法
  calculateArea(): number {
    return Math.PI * this._radius ** 2;
  }
  
  calculatePerimeter(): number {
    return 2 * Math.PI * this._radius;
  }
  
  // 额外方法
  get radius(): number {
    return this._radius;
  }
}

class Rectangle extends Shape {
  // 实现抽象属性
  readonly color: string;
  private _width: number;
  private _height: number;
  
  get area(): number {
    return this.calculateArea();
  }
  
  get perimeter(): number {
    return this.calculatePerimeter();
  }
  
  constructor(color: string, width: number, height: number) {
    super();
    this.color = color;
    this._width = width;
    this._height = height;
  }
  
  calculateArea(): number {
    return this._width * this._height;
  }
  
  calculatePerimeter(): number {
    return 2 * (this._width + this._height);
  }
}

// 使用
const circle = new Circle("red", 5);
const rectangle = new Rectangle("blue", 4, 6);

circle.describe();    // "This is a red shape with area 78.54 and perimeter 31.42"
rectangle.describe(); // "This is a blue shape with area 24 and perimeter 20"



export {}