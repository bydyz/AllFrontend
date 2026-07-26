const returnPromise = function() {
  console.log('return promise 之前')

  return new Promise((resolve, reject) => {
    console.log("resolve 或者 reject之前")

    resolve("111")
    // reject("err")

    console.log("resolve 或者 reject之后")
  })

  // 不会调用
  console.log('return promise 之后')
}


const testFunc = async function() {
  console.log("使用returnPromise之前")

  let result = await returnPromise()
  console.log("result: ", result)

  console.log("使用returnPromise之后")
}

testFunc()


// 使用returnPromise之前
// return promise 之前
// resolve 或者 reject之前
// resolve 或者 reject之后
// result:  111
// 使用returnPromise之后