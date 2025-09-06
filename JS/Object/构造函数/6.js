function getObjectType(value) {
  const obj = Object(value);
  return {
      original: value,
      converted: obj,
      type: Object.prototype.toString.call(obj),
      isWrapper: obj !== value && typeof value !== 'object'
  };
}

console.log(getObjectType(123));
// { original: 123, converted: Number {123}, type: "[object Number]", isWrapper: true }

console.log(getObjectType({}));
// { original: {}, converted: {}, type: "[object Object]", isWrapper: false }