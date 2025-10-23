/**
 * 本函数是一行行一列列的进行比对，每次先统计一行，通过则通过，没通过则单独确定
 * @param {number[][]} grid
 * @return {number}
 */
var countServers = function(grid) {
  var rowNum = grid && grid.length
  var columnNum = (grid[0] || []).length
  var columnArray = []
  for(var i = 0; i < columnNum; i++) {
    let columnArrayItem = []
    grid.forEach(item => {
      columnArrayItem.push(item[i])
    })
    columnArray.push(columnArrayItem)
  }
  console.log(rowNum, columnNum, columnArray)
  
  var total = 0
  for(var row = 0; row < rowNum; row++) {
    var currentRowNum = grid[row].filter(item => item === 1).length
    if(currentRowNum >= 2){
      total = total + currentRowNum
      continue
    }
    if(currentRowNum === 0){
      continue
    }
    // 若末行仅仅一个，则对其单独检测
    if(currentRowNum === 1){
      for(var column = 0; column < columnNum; column++) {
        let ordinalNum = grid[row].indexOf(1)
        // 可在此处储存 ordinalNum 于数组，下次先判断 ordinalNum 是否包含，有则直接加，没有则利用下面的方法判断且储存此 ordinalNum
        if(columnArray[ordinalNum].filter(item => item === 1).length >= 2){
          total++
        }
        break
      }
      continue
    } 
  }
  return total
};

console.log(countServers([[1,1,0,0],[0,0,1,0],[0,0,1,0],[0,0,0,1]]))
console.log(countServers([[1,0,1,1,0]]))