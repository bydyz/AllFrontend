/**
 * 本函数是一行行一列列的进行比对，符合一个加一个，显然有重复，应该某行通过，则跳一行，某列通过跳一列，具体见b.js
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
  for(var row = 0; row < rowNum; row++  ) {
    for(var column = 0; column < columnNum; column++ ) {
      if(grid[row][column] === 1 && (grid[row].filter(item => item === 1).length >= 2 || columnArray[column].filter(item => item === 1).length >= 2)){
        console.log('可以通信的行列数', row, column)
        total++
      }
    }
  }
  return total
};

console.log(countServers([[1,1,0,0],[0,0,1,0],[0,0,1,0],[0,0,0,1]]))
console.log(countServers([[1,0,1,1,0]]))