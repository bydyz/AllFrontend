
let info2: {} = {
  name: "why",
  age: 18,
  height: 1.88
}


info2 = {}; // ✅
info2 = []; // ✅
info2 = () => {}; // ✅
info2 = 123; // ✅
info2 = 'hello'; // ✅

info2 = null; // ❌
info2 = undefined; // ❌


//！ JavaScript 规范声明任何没有 export 的 JavaScript 文件都应该被认为是一个脚本，而非一个模块
//！ 如果你有一个文件，现在没有任何 import 或者 export，但是你希望它被作为模块处理，添加这行代码  export{}
export {}