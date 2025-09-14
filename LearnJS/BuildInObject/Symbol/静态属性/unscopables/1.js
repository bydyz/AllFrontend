// Symbol.unscopables 指用于指定对象值，其对象自身和继承的从关联对象的 with 环境绑定中排除的属性名称。


const object1 = {
  property1: 42,
};

object1[Symbol.unscopables] = {
  property1: true,
};

with (object1) {
  console.log(property1);
  // Expected output: Error: property1 is not defined
}