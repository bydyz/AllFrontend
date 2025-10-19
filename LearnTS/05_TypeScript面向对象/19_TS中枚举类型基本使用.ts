// 枚举（enum）是 TypeScript 中的一个特性，用于定义一组具名的常量，可以用于提供更友好的方式来访问数字或字符串值。然而，原生 JavaScript 并不支持 enum 关键字和枚举类型。

//！ 数字枚举
// 最常用的枚举形式，其中每个枚举成员都有一个对应的数值，默认情况下从 0 开始递增。
enum Direction {
  LEFT,       // 默认值为 0
  RIGHT       // 默认值为 1
}

const d1: Direction = Direction.LEFT

function turnDirection(direction: Direction) {
  switch(direction) {
    case Direction.LEFT:
      console.log("角色向左移动一个格子")
      break
    case Direction.RIGHT:
      console.log("角色向右移动一个格子")
      break
  }
}

// 监听键盘的点击
turnDirection(Direction.LEFT)

console.log(Direction.LEFT)     // 0
console.log(Direction.RIGHT)    // 1





//！ 也可以手动指定初始值
enum Direction1 {
  Up = 1,
  Down,
  Left,
  Right
}

console.log(Direction1.Up);    // 输出: 1
console.log(Direction1.Down);  // 输出: 2
console.log(Direction1.Left);  // 输出: 3
console.log(Direction1.Right); // 输出: 4





//！ 甚至可以为每个成员指定不同的值：
enum Direction2 {
  Up = 1,
  Down = 5,
  Left = 10,
  Right = 15
}














//！ 字符串枚举
//！ 与数字枚举不同，字符串枚举的每个成员都必须显式地赋予一个字符串字面量作为其值。
enum Direction3 {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT"
}

console.log(Direction3.Up);    // 输出: "UP"
console.log(Direction3.Down);  // 输出: "DOWN"
console.log(Direction3.Left);  // 输出: "LEFT"
console.log(Direction3.Right); // 输出: "RIGHT"















//！ 异构枚举
// 异构枚举指的是枚举中同时包含数字和字符串类型的成员。
enum BooleanLikeHeterogeneousEnum {
  No = 0,
  Yes = "YES"
}

console.log(BooleanLikeHeterogeneousEnum.No);  // 输出: 0
console.log(BooleanLikeHeterogeneousEnum.Yes); // 输出: "YES"

// 虽然可以这样做，但通常建议保持枚举的一致性，要么全部使用数字，要么全部使用字符串，以避免混淆。















//！ 反向映射
// 对于数字枚举，TypeScript 提供了一个“反向映射”，这意味着你可以通过枚举值获取枚举名称。

enum Direction4 {
  Up,
  Down,
  Left,
  Right
}

let sample = Direction4.Up;
console.log(sample);                  // 输出: 0
console.log(Direction4[sample]);       // 输出: "Up"
console.log(Direction4["Down"]);       // 输出: 1

//！ 请注意，字符串枚举不支持这种反向映射特性。
















//！ 常量枚举
// 使用 const enum 关键字定义的枚举称为常量枚举。常量枚举会在编译时被内联，不会生成实际的 JavaScript 枚举对象。
// const enum Direction {
//   Up,
//   Down,
//   Left,
//   Right
// }

// let sample = Direction.Up; // 编译后直接替换为 0

//！ 这有助于减少生成的 JavaScript 文件大小，并提高性能。

//！ 运行时枚举 vs 编译时枚举
//   运行时枚举：普通的 enum 定义会在 JavaScript 中生成相应的对象。
//   编译时枚举：const enum 在编译阶段会被内联，不会出现在生成的 JavaScript 代码中。


export {}

