function simpleF() {
  console.log("0")
}
    
async function example() {
  let result = await simpleF();
  console.log(result);
  let a = await 22
  console.log(a)
}

example();

// 0
// undefined
// 22



