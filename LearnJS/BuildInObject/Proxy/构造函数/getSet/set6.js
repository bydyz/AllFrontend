// 数组操作拦截

const array = [1, 2, 3];

const trackedArray = new Proxy(array, {
  set(target, property, value, receiver) {
    const oldLength = target.length;
    const success = Reflect.set(target, property, value, receiver);
    
    if (success) {
      // 检测数组长度变化
      if (property === 'length' && value !== oldLength) {
        console.log(`Array length changed from ${oldLength} to ${value}`);
      }
      // 检测元素添加
      else if (property >= target.length) {
        console.log(`Added element at index ${property}: ${value}`);
      }
      // 检测元素修改
      else {
        console.log(`Modified element at index ${property}: ${value}`);
      }
    }
    
    return success;
  }
});

trackedArray.push(4);    
// 输出: Added element at index 3: 4
// 输出: Array length changed from 3 to 4

trackedArray[1] = 20;    
// 输出: Modified element at index 1: 20

trackedArray.length = 2; 
// 输出: Array length changed from 4 to 2