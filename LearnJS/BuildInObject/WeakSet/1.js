// 创建和基本操作

function demonstrateBasicOperations() {
  console.log("=== WeakSet 基本操作 ===");

  // 创建 WeakSet
  const weakSet = new WeakSet();

  // 创建一些对象
  const obj1 = { id: 1, name: "Object 1" };
  const obj2 = { id: 2, name: "Object 2" };
  const obj3 = { id: 3, name: "Object 3" };

  // 添加对象到 WeakSet
  weakSet.add(obj1);
  weakSet.add(obj2);
  weakSet.add(obj3);

  // 检查对象是否存在
  console.log("包含 obj1:", weakSet.has(obj1));
  console.log("包含 obj2:", weakSet.has(obj2));
  console.log("包含新对象:", weakSet.has({})); // false

  // 删除对象
  weakSet.delete(obj2);
  console.log("删除 obj2 后是否还存在:", weakSet.has(obj2));

  // 尝试添加非对象值（会报错）
  try {
    weakSet.add("string"); // 错误！
  } catch (error) {
    console.log("添加字符串错误:", error.message);
  }

  try {
    weakSet.add(42); // 错误！
  } catch (error) {
    console.log("添加数字错误:", error.message);
  }

  return weakSet;
}

const basicWeakSet = demonstrateBasicOperations();
