class Dep {
  constructor() {
    this.subscribers = new Set();
  }

  depend() {
    if (activeEffect) {
      this.subscribers.add(activeEffect);
    }
  }

  notify() {
    this.subscribers.forEach(effect => {
      effect();
    })
  }
}

let activeEffect = null;
function watchEffect(effect) {
  activeEffect = effect;
  effect();
  activeEffect = null;
}


// Map({key: value}): key是任意值，包括函数、对象或任意基本类型。
// WeakMap({key(对象): value}): key是一个对象, 弱引用
// 利用Map，给需要响应式的对象内部所有键，设置一个dep
const targetMap = new WeakMap();
function getDep(target, key) {
  // 1.根据对象(target)取出对应的Map对象      target是原本的对象数据，key是target中的一个个键名
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    depsMap = new Map();
    targetMap.set(target, depsMap);
  }

  // 2.取出具体的dep对象
  let dep = depsMap.get(key);
  if (!dep) {
    dep = new Dep();
    depsMap.set(key, dep);
  }
  return dep;
}


// vue2对raw进行数据劫持
function reactive(raw) {
  Object.keys(raw).forEach(key => {
    const dep = getDep(raw, key);

    // 这里需要用value存储值，以便后面的set使用，因为set里不能对raw进行操作，因为用了会触发Object.defineProperty里的set
    let value = raw[key];

    // Object.defineProperty  会使得后面获取通过reactive定义的对象的某个变量值时，获取会调用get()，设置会调用set()
    Object.defineProperty(raw, key, {
      get() {
        dep.depend();
        return value;
      },
      set(newValue) {
        if (value !== newValue) {
          value = newValue;
          dep.notify();
        }
      }
    })
  })

  return raw;
}



// 这些js代码，哪里先运行，哪里后运行，最终才会有这个需要的效果，谁先谁后，咋来的？？？？？？？？？



// 测试代码
const info = reactive({counter: 100, name: "why"});
// watchEffect1
// watchEffect(function () {
//   console.log("effect1:", info.counter * 2, info.name);
// })

// watchEffect2
// watchEffect(function () {
//   console.log("effect2:", info.counter * info.counter);
// })

// watchEffect3
// watchEffect(function () {
//   console.log("effect3:", info.counter + 10, info.name);
// })

// info.counter++;
// info.name = "why";



const foo = reactive({height: 1.88});
// watchEffect(function () {
//   console.log("effect4:", foo.height);
// })
watchEffect(function () {
  console.log("effect3:", info.counter + 10, info.name);
})


foo.height = 2;
