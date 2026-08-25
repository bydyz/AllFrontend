// 贪心思想：先求总和，再减去最小的需要移除的数
var maxSumDivThree = function(num) {
  var allTotal = getSum(num, 0, num.length) // 计算所有数的总和
  var remainder = allTotal % 3 // 计算总和除以3的余数
  var groupData = [[], [], []] // 按余数分组
  num.forEach(item => {
    groupData[item % 3].push(item)
  });
  // 余1和余2的组按升序排列，便于取最小值
  groupData[1].sort((a, b) => a - b)
  groupData[2].sort((a, b) => a - b)
  var minusTotal = 0 // 需要减去的最小值
  if(remainder === 1) {
    // 余数为1时，可以减去一个余1的数，或者两个余2的数
    if(groupData[1].length >= 1) minusTotal = groupData[1][0]
    if(groupData[2].length >= 2) minusTotal = Math.min(minusTotal, groupData[2][0] + groupData[2][1])
  }
  if(remainder === 2) {
    // 余数为2时，可以减去两个余1的数，或者一个余2的数
    if(groupData[1].length >= 2) minusTotal = groupData[1][0] + groupData[1][1]
    if(groupData[2].length >= 1) minusTotal = Math.min(minusTotal, groupData[2][0])
  }

  return allTotal - minusTotal
}

// 计算数组从start到end的和
const getSum = (list, start, end) => {
  let sum = 0;
  for (let i = start; i < end; ++i) {
      sum += list[i];
  }
  return sum;
};

/*
复杂度分析：
时间复杂度：O(n log n)，主要消耗在排序上。
空间复杂度：O(n)，用于存储分组数组。
*/