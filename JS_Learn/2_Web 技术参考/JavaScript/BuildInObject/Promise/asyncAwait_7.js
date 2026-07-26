function go() {
  console.log("000")

  promiseOne = new Promise((resolve, reject) => {
    console.log('111')
    resolve("222")
  })

  promiseOne.then(res => console.log(res))

  console.log("333")

  return "444"
}

async function test(params) {
  console.log("555")
  let a = await go()
  console.log(a)
  console.log("666")
}

test()