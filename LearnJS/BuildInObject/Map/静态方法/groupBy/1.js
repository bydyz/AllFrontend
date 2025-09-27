// Map.groupBy() 的基本语法
//   Map.groupBy(items, callbackFn)
//     items: 要分组的可迭代对象（通常是数组）
//     callbackFn: 对每个元素执行的函数，返回分组键


// 参数
//   items
//     一个将进行元素分组的可迭代对象（例如 Array）。

// callbackFn
//   对可迭代对象中的每个元素执行的函数。它应该返回一个值（对象或原始类型）来表示当前元素的分组。该函数被调用时将传入以下参数：

//     element
//       数组中当前正在处理的元素。

//     index
//       正在处理的元素在数组中的索引。

// 返回值
// 一个包含了每一个组的键的 Map 对象，每个键都分配了一个包含关联组元素的数组。


const inventory = [
  { name: "asparagus", type: "vegetables", quantity: 9 },
  { name: "bananas", type: "fruit", quantity: 5 },
  { name: "goat", type: "meat", quantity: 23 },
  { name: "cherries", type: "fruit", quantity: 12 },
  { name: "fish", type: "meat", quantity: 22 },
];

const restock = { restock: true };
const sufficient = { restock: false };

// 不影响 操作的数组    返回 Map , key 为  restock  sufficient    对应的 value 为 过滤出来的 数组
const result = Map.groupBy(inventory, ({ quantity }, index) => {
  console.log('打印index', index)
  return quantity < 6 ? restock : sufficient;
});

console.log(inventory)
console.log(result)
console.log(result.get(restock));
// [{ name: "bananas", type: "fruit", quantity: 5 }]