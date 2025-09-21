let validator = {
  set: function (obj, prop, value) {
    if (prop === "age") {
      if (!Number.isInteger(value)) {
        throw new TypeError("The age is not an integer");
      }
      if (value > 200) {
        throw new RangeError("The age seems invalid");
      }
    }

    // The default behavior to store the value
    obj[prop] = value;

    // 表示成功
    return true;
  },
};

let person = new Proxy({}, validator);

person.age = 100;

console.log(person.age);
// 100

try {
  person.age = "young";
} catch(e) {
  console.log('young', e)
}
// 抛出异常：Uncaught TypeError: The age is not an integer

try {
  person.age = 300;
} catch(e) {
  console.log('300', e)
}
// 抛出异常：Uncaught RangeError: The age seems invalid
