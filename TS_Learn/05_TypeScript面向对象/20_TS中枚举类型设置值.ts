// 定义枚举类型
// enum Direction {
//   LEFT = 0,
//   RIGHT = 1
// }

// enum Direction {
//   LEFT = 100,
//   RIGHT
// }

// ！   要么都有值，要么都没有，或者第一个有
enum Direction {
  LEFT = "LEFT 1",
  RIGHT = "RIGHT 2"
}

enum Operation {
  //！ 左移运算符 (<<) 将一个数的二进制表示向左移动指定的位数，右侧空出的位用零填充。
  Read = 1 << 0,
  Write = 1 << 1,
  foo = 1 << 2
}

const d1: Direction = Direction.LEFT

console.log(d1)   // LEFT 1

export {}
