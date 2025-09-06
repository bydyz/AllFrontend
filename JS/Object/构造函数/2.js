// 测试不同类型值的转换
const testValues = [
  null,
  undefined,
  true,
  42,
  "hello",
  [1, 2, 3],
  { name: "John" },
  new Date()
];

testValues.forEach(value => {
  const objNew = new Object(value);
  const objFunc = Object(value);
  
  console.log(`--- 输入: ${value} (${typeof value}) ---`);
  console.log('new Object():', objNew, typeof objNew);
  console.log('Object():     ', objFunc, typeof objFunc);
  console.log('相等:', objNew === objFunc);
  console.log('');
});