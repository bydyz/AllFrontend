
// !感觉抽象类，抽象方法，可以用来类型限制的？？？？？？？？？？？？？？？且继承自其的子类的实例对象，满足其做类型限制所需要的实例对象
abstract class Shape {
  //? getArea方法只有声明没有实现体
  //? 实现让子类自己实现
  //? 可以将getArea方法定义为抽象方法: 在方法的前面加abstract
  //? 抽象方法必须出现在抽象类中, 类前面也需要加abstract
  abstract getArea(): number
}


class Rectangle extends Shape {
  constructor(public width: number, public height: number) {
    //! 派生类的构造函数必须包含 "super" 调用
    super()
  }

  getArea() {
    return this.width * this.height
  }
}

class Circle extends Shape {
  constructor(public radius: number) {
    super()
  }

  getArea() {
    return this.radius ** 2 * Math.PI
  }
}

class Triangle extends Shape {
  getArea() {
    return 100
  }
}













//! 倘若类型限制为父类，传参时   可以传入子类的实例对象
// 通用的函数     
// ！使用抽象类  进行参数限制
function calcArea(shape: Shape) {
  return shape.getArea()
}

// ！传参时，其子类的实例对象可以满足要求   传参需要对应类的变量
calcArea(new Rectangle(10, 20))
calcArea(new Circle(5))
calcArea(new Triangle())

// ！  传参的属性限制为 抽象类，对此我们可以传入 实例

//！ 在Java中会报错: 不允许
calcArea({ getArea: function() {
  return 1
} })

//！ 抽象类不能被实例化
// calcArea(new Shape())

// calcArea(100)
// calcArea("abc")



export {}