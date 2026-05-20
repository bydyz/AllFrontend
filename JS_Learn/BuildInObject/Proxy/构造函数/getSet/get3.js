function createAccessLogger(obj) {
  return new Proxy(obj, {
    get: function(target, property, receiver) {
      console.log(`target`, target)             // target { name: 'Alice', age: 25, secret: 'hidden' }
      console.log(`property`, property);        // property name
      console.log(`receiver`, receiver)         // receiver { name: 'Alice', age: 25, secret: 'hidden' }

      // 使用 Reflect.get 来实际获取值
      return Reflect.get(target, property, receiver);
    }
  });
}

const loggedObj = createAccessLogger({
  name: 'Alice',
  age: 25,
  secret: 'hidden'
});


const person = {
  profile: loggedObj,
  getName() {
    return this.profile.name;
  }
};
// receiver: loggedObj（代理对象）
console.log(person.getName());