function logMapElements(value, key, map) {
  console.log(`m[${key}] = ${value}`);
  console.log(map)
}

new Map([
  ["foo", 3],
  ["bar", {}],
  ["baz", undefined],
]).forEach(logMapElements);
