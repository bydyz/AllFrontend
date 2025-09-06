// CommonJS是一个模块化标准，每一个文件均是一个模块，利用require导入模块时，会触发模块代码的执行

// require函数返回的东西就是模块化导出的结果

function require(modulePath) {
  // 1.根据传递的模块路径，得到完整的绝对路径(唯一的)，利用其作为表示缓存的key
  var moduleId = getModuleId(modulePath);

  // 2.判断是否有require模块的缓存，有的话则直接拿缓存中的来使用；故模块的代码只会运行一次，后面多次导入也不会运行
  if(cache[moduleId]) {
    return cache[moduleId]
  }

  // 3.真正运行要导入的模块代码的辅助函数。即在commonjs中每一个模块，最终都是在一个函数中运行的，与ES module中不同
  // require 是require函数本身    __filename 当前模块的绝对路径      __dirname 当前模块所处的目录的绝对路径
  function _require(exports, require, module, __filename, __dirname) {

  }

  // 4.准备并运行辅助函数
  var module = {
    exports: {}
  }
  var exports = module.exports
  // 得到模块文件的绝对路径
  var __filename = moduleId
  // 得到模块所在目录的绝对路径
  var __dirname = getDirname(__filename)

  // 绑定this为exports
  _require.call(exports, exports, require, module, __filename, __dirname)

  // 5.缓存 module.exports
  cache[moduleId] = module.exports

  return module.exports



  //！ 因此require返回后  this  exports  module.exports  三者是完全一样的
}