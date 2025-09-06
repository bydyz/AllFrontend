let data = {
  a: undefined,
  b: null,
  c: false,
  d: 0,
  e: NaN,
  f: ''   //中间有无空格均可
}

Object.keys(data).forEach(item => {
  console.log(item + ': ' + Boolean(data[item]))
})