// 统计可以相互通信的服务器数量（暴力解法，有重复计算）
var countServers = function(grid) {
  var rowNum = grid && grid.length
  var columnNum = (grid[0] || []).length
  // 将列数据转置为行数据，便于按列统计
  var columnArray = []
  for(var i = 0; i < columnNum; i++) {
    let columnArrayItem = []
    grid.forEach(item => {
      columnArrayItem.push(item[i])
    })
    columnArray.push(columnArrayItem)
  }
  
  var total = 0
  for(var row = 0; row < rowNum; row++  ) {
    for(var column = 0; column < columnNum; column++ ) {
      // 如果当前位置有服务器，且同行或同列有其他服务器，则可以通信
      if(grid[row][column] === 1 && (grid[row].filter(item => item === 1).length >= 2 || columnArray[column].filter(item => item === 1).length >= 2)){
        total++
      }
    }
  }
  return total
};

/*
复杂度分析：
时间复杂度：O(m * n * (m + n))，其中m是行数，n是列数。
空间复杂度：O(m * n)，用于存储转置后的列数据。
*/