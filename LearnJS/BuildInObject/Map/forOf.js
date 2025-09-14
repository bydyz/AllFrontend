const myMap = new Map();

const keyObj = {};
const value = 'Hello, Map!';
myMap.set(keyObj, value);

for (const [key, value] of myMap) {
  console.log(`${key}: ${value}`);
}