class Person {
  name: string;
  age: number;
  id: string;
  isActive: boolean = true;
  
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
    this.id = Math.random().toString();
  }
  
  activate(): void {
    this.isActive = true;
  }
  
  static drink(): void {
    console.log("Extended drinking");
  }
  
  static version: string = "1.0.0";
}

interface ICTORPerson {
  new (argument1: string, argument2: number): Person

  //？ 构造签名接口中，只能多添加 静态属性、静态方法 的限定
  //！ 这里表示要加  静态方法
  eat(): void
}

function factory(fn: ICTORPerson) {
  const f = new fn('rc', 25)
  return f
}




class Student {
  name: string
  age: number
  id: string = '666'
  isActive: boolean = true

  constructor(name: string, age: number) {
    this.name = name
    this.age = age

    this.id = Math.random().toString();
  }

  activate(): void {
    this.isActive = true;
  }

  static eat(): void {
    console.log("Extended drinking");
  }
}

factory(Student)


export {}