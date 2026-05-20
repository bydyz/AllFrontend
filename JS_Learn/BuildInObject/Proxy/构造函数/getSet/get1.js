// var p = new Proxy(target, {
//   get: function (target, property, receiver) {},
// });


// 参数
//   以下是传递给 get 方法的参数，this 上下文绑定在handler 对象上。

//     target
//       目标对象。  似乎永远是 new Proxy 的第一个参数

//     property
//       被获取的属性名。

//     receiver
//       Proxy 或者继承 Proxy 的对象

// 返回值
//   get 方法可以返回任何值。

// 描述
//   handler.get 方法用于拦截对象的读取属性操作。

// 拦截
//   该方法会拦截目标对象的以下操作：
//     访问属性：proxy[foo] 和 proxy.bar
//     访问原型链上的属性：Object.create(proxy)[foo]
//     Reflect.get()

// 约束
//   如果违背了以下的约束，proxy 会抛出 TypeError:
//     如果要访问的目标属性是不可写以及不可配置的，则返回的值必须与该目标属性的值相同。
//     如果要访问的目标属性没有配置访问方法，即 get 方法是 undefined 的，则返回值必须为 undefined。


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