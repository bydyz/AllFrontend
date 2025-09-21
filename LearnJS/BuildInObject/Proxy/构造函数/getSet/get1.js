function createAccessLogger(obj) {
  return new Proxy(obj, {
    get: function(target, property, receiver) {
      console.log(`target`, target)             // target { name: 'Alice', age: 25, secret: 'hidden' }
      console.log(`property`, property);        // property name
      console.log(`receiver`, receiver)         // receiver { name: 'Alice', age: 25, secret: 'hidden' }

      
      // 如果你写成 Reflect.get(target, prop)（不传 receiver），那么 this 会指向 target，可能破坏代理语义。
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
console.log(`loggedObj`, loggedObj)             // loggedObj { name: 'Alice', age: 25, secret: 'hidden' }



// receiver: loggedObj（代理对象本身）
console.log(loggedObj.name);                    // Alice





console.log('-------------------------------------------------------')





// receiver: 仍然是 loggedObj（代理对象）
const wrapper = { obj: loggedObj };
console.log(wrapper.obj.name);





console.log('-------------------------------------------------------')





const person = {
  profile: loggedObj,
  getName() {
    return this.profile.name;
  }
};
// receiver: loggedObj（代理对象）
console.log(person.getName());