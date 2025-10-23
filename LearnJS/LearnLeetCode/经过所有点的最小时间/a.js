/**
 * @param {number[][]} points
 * @return {number}
 */
var minTimeToVisitAllPoints = function(points) {
  var everyStepDistance = []
  for(var i = 0, j = 1; j < points.length; i++, j++) {
    var pointStart = points[i]
    var pointEnd = points[j]
    console.log(pointStart, pointEnd)
    var xDistance = Math.abs(pointStart[0] - pointEnd[0])
    var yDistance = Math.abs(pointStart[1] - pointEnd[1])
    everyStepDistance.push(Math.max(xDistance, yDistance))
  }
  return everyStepDistance.reduce((pre, cur) => {
    return pre + cur
  }, 0)
};

console.log(minTimeToVisitAllPoints([[1,1],[3,4],[-1,0]]))


// 分析切比雪夫距离，单纯从x或者y方向看，从一点到另一点都至少要走 x方向上的距离 和 y方向上的距离 的较大值，故此时最小值是这个较大值，而先对角走，再直线走时，所取的值等于这个较大值，故最小时间即是这个较大值所需的时间