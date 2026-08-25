// 计算访问所有点的最小时间（切比雪夫距离）
var minTimeToVisitAllPoints = function(points) {
  var everyStepDistance = []
  for(var i = 0, j = 1; j < points.length; i++, j++) {
    var pointStart = points[i]
    var pointEnd = points[j]
    // 计算x方向和y方向的距离
    var xDistance = Math.abs(pointStart[0] - pointEnd[0])
    var yDistance = Math.abs(pointStart[1] - pointEnd[1])
    // 切比雪夫距离：取两个方向距离的最大值
    everyStepDistance.push(Math.max(xDistance, yDistance))
  }
  // 累加所有相邻点之间的距离
  return everyStepDistance.reduce((pre, cur) => {
    return pre + cur
  }, 0)
};

/*
复杂度分析：
时间复杂度：O(n)，其中n是点的数量。
空间复杂度：O(n)，用于存储每一步的距离。
*/