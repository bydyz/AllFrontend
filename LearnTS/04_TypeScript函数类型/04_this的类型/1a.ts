//！ 在没有对TS进行特殊配置的情况下, this是any类型

//！ tsc --init    生成ts配置文件   tsconfig.json


//！ 1.对象中的函数中的this
const obj = {
  name: "why",
  studying: function() {
    // 默认情况下, this是any类型
    console.log(this.name, "studying")
  }
}

obj.studying()    // why studying
// 将this的指向指向了  {name: [1, 2]}
obj.studying.call({name: [1, 2]})   // [1, 2] studying



export {}
