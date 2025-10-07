const target = {
  get name() {
    console.log('target name getter called');
    return 'Alice';
  }
};

const proxy = new Proxy(target, {
  get: function(target, property, receiver) {
    console.log(`Proxy get trap: ${property}`);
    console.log('Receiver:', receiver === child ? 'child' : 'other');

    return target[property];  // 这里会触发 getter！
  }
});

const child = Object.create(proxy);
console.log(child.name);