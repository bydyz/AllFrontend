this.a = 1
exports.b = 2
exports = {
  c: 3
}
module.exports = {
  d: 4
}
exports.e = 5
this.f = 6



//！ 虽然刚开始时，this exports module.exports 是一样的，但是经过代码块后，三者就可能不同
// this = {
//   a: 1,
//   f: 6
// }

// exports = {
//   c: 3,
//   e: 5
// }

// module.exports = {
//   d: 4
// }