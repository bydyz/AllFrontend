// 值必须是对象

function demonstrateValueRequirements() {
  console.log('\n=== WeakSet 值的限制 ===');
  
  const weakSet = new WeakSet();
  
  // 有效的值 - 各种对象类型
  const objectVal = { data: 'plain object' };
  const arrayVal = [1, 2, 3];
  const functionVal = function() { return 'hello'; };
  const dateVal = new Date();
  const mapVal = new Map();
  
  weakSet.add(objectVal);
  weakSet.add(arrayVal);
  weakSet.add(functionVal);
  weakSet.add(dateVal);
  weakSet.add(mapVal);
  
  console.log('对象值存在:', weakSet.has(objectVal));
  console.log('数组值存在:', weakSet.has(arrayVal));
  console.log('函数值存在:', weakSet.has(functionVal));
  console.log('日期值存在:', weakSet.has(dateVal));
  console.log('Map值存在:', weakSet.has(mapVal));
  
  // 无效的值
  const invalidValues = ['string', 42, true, null, undefined, Symbol('test')];
  
  invalidValues.forEach(val => {
    try {
      weakSet.add(val);
    } catch (error) {
      console.log(`添加 ${typeof val} 错误:`, error.message);
    }
  });
}

demonstrateValueRequirements();