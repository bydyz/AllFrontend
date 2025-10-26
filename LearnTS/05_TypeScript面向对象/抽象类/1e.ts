// 接口
interface Drawable {
  draw(): void;
  color: string;
}

// 抽象类
abstract class GraphicObject {
  // 可以有具体实现
  protected x: number = 0;
  protected y: number = 0;
  
  // 抽象成员
  abstract draw(): void;
  abstract readonly name: string;
  
  // 具体方法
  move(newX: number, newY: number): void {
    this.x = newX;
    this.y = newY;
    console.log(`${this.name} moved to (${newX}, ${newY})`);
  }
  
  // 具体方法
  getPosition(): { x: number; y: number } {
    return { x: this.x, y: this.y };
  }
}

// 同时实现接口和继承抽象类
class Circle extends GraphicObject implements Drawable {
  readonly name: string = "Circle";
  color: string;
  private radius: number;
  
  constructor(color: string, radius: number, x: number = 0, y: number = 0) {
    super();
    this.color = color;
    this.radius = radius;
    this.x = x;
    this.y = y;
  }
  
  draw(): void {
    console.log(`Drawing a ${this.color} circle with radius ${this.radius} at (${this.x}, ${this.y})`);
  }
  
  // 额外方法
  getArea(): number {
    return Math.PI * this.radius ** 2;
  }
}

class Rectangle extends GraphicObject implements Drawable {
  readonly name: string = "Rectangle";
  color: string;
  private width: number;
  private height: number;
  
  constructor(color: string, width: number, height: number, x: number = 0, y: number = 0) {
    super();
    this.color = color;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
  }
  
  draw(): void {
    console.log(`Drawing a ${this.color} rectangle ${this.width}x${this.height} at (${this.x}, ${this.y})`);
  }
  
  // 额外方法
  getArea(): number {
    return this.width * this.height;
  }
}

// 使用
const circle = new Circle("red", 10, 5, 5);
const rectangle = new Rectangle("blue", 8, 6, 10, 10);

circle.draw();        // "Drawing a red circle with radius 10 at (5, 5)"
circle.move(15, 15);  // "Circle moved to (15, 15)"
console.log(circle.getArea()); // 314.16

rectangle.draw();     // "Drawing a blue rectangle 8x6 at (10, 10)"
rectangle.move(20, 20); // "Rectangle moved to (20, 20)"
console.log(rectangle.getArea()); // 48



export {}