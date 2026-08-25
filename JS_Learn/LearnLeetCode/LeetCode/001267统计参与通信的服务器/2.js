// 统计可以相互通信的服务器数量（优化解法，避免重复计算）
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
  for(var row = 0; row < rowNum; row++) {
    // 统计当前行的服务器数量
    var currentRowNum = grid[row].filter(item => item === 1).length
    if(currentRowNum >= 2){
      // 如果当前行有2个或以上服务器，它们都可以相互通信
      total = total + currentRowNum
      continue
    }
    if(currentRowNum === 0){
      // 当前行没有服务器
      continue
    }
    // 如果当前行只有1个服务器，检查它所在的列是否有其他服务器
    if(currentRowNum === 1){
      for(var column = 0; column < columnNum; column++) {
        let ordinalNum = grid[row].indexOf(1) // 找到该服务器在行中的位置
        if(columnArray[ordinalNum].filter(item => item === 1).length >= 2){
          // 同列有其他服务器，可以通信
          total++
        }
        break // 只需要检查一次
      }
      continue
    } 
  }
  return total
};

/*
复杂度分析：
时间复杂度：O(m * n)，其中m是行数，n是列数。
空间复杂度：O(m * n)，用于存储转置后的列数据。
*/