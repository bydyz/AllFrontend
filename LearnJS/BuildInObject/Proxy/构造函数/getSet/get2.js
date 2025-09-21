function createAccessLogger(obj) {
  return new Proxy(obj, {
    get: function(target, property, receiver) {
      console.log(`Target:`, target);
      console.log(`Property: ${String(property)}`);
      console.log(`Receiver:`, receiver);
      console.log(`Target === Receiver:`, target === receiver);

      // 实际 Proxy.prototype 存在，但引擎内部可能未正确暴露
      // 因为 Proxy 是特殊内置对象，某些 JS 引擎在 instanceof 检查时对其处理不当，导致试图读取其原型时出错
      // console.log(`Receiver is Proxy:`, receiver instanceof Proxy);    // 这个会报  Uncaught TypeError: Function has non-object prototype 'undefined' in instanceof check
      console.log('---');
      
      return Reflect.get(target, property, receiver);
    }
  });
}

const originalObj = {
  name: 'Alice',
  age: 25,
  secret: 'hidden'
};

const loggedObj = createAccessLogger(originalObj);





console.log('=== 直接访问 ===');
console.log(loggedObj.name);






console.log('\n=== 通过其他对象访问 ===');
const wrapper = { obj: loggedObj };
console.log(wrapper.obj.age);






console.log('\n=== 方法调用 ===');
const person = {
  profile: loggedObj,
  getSecret() {
    return this.profile.secret;
  }
};
console.log(person.getSecret());