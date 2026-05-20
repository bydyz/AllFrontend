class Dep {
  constructor() {
    // 这句的作用是，给后来创造的类，添加一个  subscribers（订阅者）
    // new set()  创建一个集合，集合内的元素是不可重复的，向其中加入多个相同的元素，最终只会存在一个
    this.subscribers = new Set();
  }

  addEffect(effect) {
    this.subscribers.add(effect);
  }

  notify() {
    this.subscribers.forEach(effect => {
      effect();
    })
  }
}


const info = {counter: 100};

const dep = new Dep();

function doubleCounter() {
  console.log(info.counter * 2);
}

function powerCounter() {
  console.log(info.counter * info.counter);
}

dep.addEffect(doubleCounter);
dep.addEffect(powerCounter);

info.counter++;
dep.notify();
