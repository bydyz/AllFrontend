// ObjectGetOwnPropertyDescriptors


// ES2017 引入了Object.getOwnPropertyDescriptors()方法，返回指定对象所有自身属性（非继承属性）的描述对象

const obj = {
  id:123,
  get bar(){return 'abc'}
};
let obj1 = Object.getOwnPropertyDescriptors(obj)
console.log(obj1)


/* 

{
  id: { value: 123, writable: true, enumerable: true, configurable: true },
  bar: {
    get: [Function: get bar],
    set: undefined,
    enumerable: true,
    configurable: true
  }
}


*/