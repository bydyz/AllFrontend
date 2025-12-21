//!  number | string | symbol
type Res = keyof any



// !    a、b、c 的结果是 true     d 是 false
type a = "上海" | "北京" | "洛杉矶" extends keyof any ? true : false
type b = "上海" | 1 | "洛杉矶" extends keyof any ? true : false
type c = 5 | 1 | 16 extends keyof any ? true : false

type d = 5 | 1 | true extends keyof any ? true : false


export {}