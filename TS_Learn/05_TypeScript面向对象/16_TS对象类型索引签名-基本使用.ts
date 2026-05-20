// 1.索引签名的理解
// !   就返回了个  字符串   ， 这个字符串也符合  infoType    interesting
interface InfoType {
  // 索引签名: 可以通过字符串索引, 去获取到一个值, 也是字符串
  [key: string]: string
}

//！ 基本实现
function getInfo1(): InfoType {
  return {
    name: "Alice",
    city: "Beijing",
    job: "Engineer"
  };
}



//！ 动态生成对象
function createUserProfile(username: string, email: string): InfoType {
  return {
    username,
    email,
    role: "user"
  };
}

const profile = createUserProfile("john_doe", "john@example.com");
console.log(profile);
// 输出: { username: "john_doe", email: "john@example.com", role: "user" }



//！ 使用 Record 工具类型
//！ 虽然你用的是接口 InfoType，但 TypeScript 提供了内置工具类型 Record<string, string> 来表达相同含义。
function getMetadata(): Record<string, string> {
  return {
    createdAt: "2025-04-05",
    updatedAt: "2025-04-06"
  };
}








interface InfoType1 {
  [key: string]: string | number | boolean;
}

type InfoType2 = Record<string, string | number | boolean>;








function getInfo2(): InfoType {
  //！ 这样可以
  const abc: any = "hahah"
  return abc
}
// 为什么你的函数可以返回 any 类型？
// 因为你用了 any
//   any 表示：“我不管这个变量是什么类型，TypeScript 也不用检查它。”
//   所以当你写 return abc; 时，TypeScript 不会去验证 abc 是否真的符合 InfoType 接口的结构。
//   它只是简单地认为：“开发者说它是对的，那就让它过去吧。”


const info = getInfo2()
const name = info["name"]
console.log(name, info.age, info.address, info)    // undefined undefined undefined hahah


export {}

