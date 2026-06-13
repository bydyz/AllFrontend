// call(thisArg)
// call(thisArg, arg1)
// call(thisArg, arg1, arg2)
// call(thisArg, arg1, arg2, /* …, */ argN)

// thisArg  必选    浏览器环境下


let b = {
  name: 'b'
}

function a(){
  console.log(this);
}

a()
