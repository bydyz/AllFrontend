abstract class Shape {
  // 抽象实例属性（子类必须实现）
  abstract readonly color: string;
  abstract area: number;
  abstract perimeter: number;
  
  // 参数属性（构造函数参数直接声明为属性）
  constructor(public readonly name: string) {}
}



export {}