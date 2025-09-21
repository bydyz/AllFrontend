let target = {
    message: "Hello, world!"
};

let handler = {
    // 拦截读取属性的操作
    get: function(target, property, receiver) {
        console.log(`Getting ${property}: ${target[property]}`);
        return Reflect.get(target, property, receiver);
    },
    // 拦截设置属性的操作
    set: function(target, property, value, receiver) {
        console.log(`Setting ${property} to ${value}`);
        return Reflect.set(target, property, value, receiver);
    }
};

let proxy = new Proxy(target, handler);

console.log(proxy.message); // 输出: Getting message: Hello, world!
                            //       Hello, world!

proxy.message = 'Hello, universe!'; // 输出: Setting message to Hello, universe!