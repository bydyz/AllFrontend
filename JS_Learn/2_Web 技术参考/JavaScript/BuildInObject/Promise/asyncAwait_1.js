function getSomeThing(){
  return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        console.log("0")
        resolve('获取成功')
      },3000)
  })
}

async function test(){
  let a = await getSomeThing();
  console.log("1" + a)
}

let a = test();
console.log("2" + a)

// 2[object Promise]
// 0
// 1获取成功
