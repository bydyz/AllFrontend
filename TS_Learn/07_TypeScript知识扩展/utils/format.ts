
// export function formatPrice() {

// }

// export function formatDate() {
  
// }






//!  namespace 是一种用于组织代码和创建命名空间的语法结构。namespace 提供了一种在全局作用域中创建具有层次结构的命名空间，以避免命名冲突，并将相关的代码组织在一起。

// namespace price： 创建了一个名为 price 的命名空间。
// export function format： 在 price 命名空间中声明了一个公开的函数 format。
// export const name = "price"： 在 price 命名空间中声明了一个公开的常量 name。

// 这样，你可以通过 price.format 和 price.name 来访问这个命名空间中的函数和常量。命名空间有助于将相关的功能组织到一起，提高了代码的可维护性和可读性。


export namespace price {
  export function format(price: string) {
    return "¥" + price
  }

  export const name = "price"
}


// 导入命名空间中的内容
// import { price } from "./yourModule";

// // 使用命名空间中的函数和常量
// const formattedPrice = price.format("100");
// console.log(formattedPrice);  // 输出 "¥100"

// console.log(price.name);  // 输出 "price"






// !  同一个TS文件，可以有多个 namespace !!!
export namespace date {
  export function format(dateString: any) {
    return "2022-10-10"
  }

  const name = "date"
}


// export {}
