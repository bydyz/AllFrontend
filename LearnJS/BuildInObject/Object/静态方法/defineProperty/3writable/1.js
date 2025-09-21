class Parent {
  constructor() {
    Object.defineProperty(this, 'inheritedProp', {
      value: 'parent value',
      writable: false
    });
  }
}

class Child extends Parent {
  attemptChange() {
    console.log('子类Child的 attemptChange方法')

    // 同样不能修改继承的不可写属性
    this.inheritedProp = 'child value'; // 静默失败或报错
  }

  test() {
    console.log('子类Child的 test方法')
  }
}

const child = new Child();
// child.attemptChange(); // 调用会报错
child.test();
console.log(child.inheritedProp); // 'parent value'