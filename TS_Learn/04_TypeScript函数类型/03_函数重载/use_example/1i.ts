//！   泛型函数重载


// 重载签名
function merge<T, U>(obj1: T, obj2: U): T & U;
function merge<T, U, V>(obj1: T, obj2: U, obj3: V): T & U & V;
function merge<T extends object>(...objects: T[]): T;

// 实现签名
function merge(...objects: any[]): any {
  console.log('objects', objects)   // 传参 组合成一个数组
  return objects.reduce((result, current) => {
    return { ...result, ...current };
  }, {});
}

// 使用
const merged1 = merge({ a: 1 }, { b: 2 });
// ✅ 类型: { a: number } & { b: number }

const merged2 = merge({ a: 1 }, { b: 2 }, { c: 3 });
// ✅ 类型: { a: number } & { b: number } & { c: number }

const merged3 = merge({ x: 1 }, { y: 2 }, { z: 3 }, { w: 4 });
// ✅ 类型: { x: number } & { y: number } & { z: number } & { w: number }

console.log(merged1); // { a: 1, b: 2 }
console.log(merged2); // { a: 1, b: 2, c: 3 }
console.log(merged3); // { x: 1, y: 2, z: 3, w: 4 }



export {}