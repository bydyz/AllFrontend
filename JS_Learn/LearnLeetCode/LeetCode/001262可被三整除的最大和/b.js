var maxSumDivThree = function(num) {
  var allTotal = getSum(num, 0, num.length)
  var remainder = allTotal % 3
  var groupData = [[], [], []]
  num.forEach(item => {
    groupData[item % 3].push(item)
  });
  groupData[1].sort((a, b) => a - b)
  groupData[2].sort((a, b) => a - b)
  var minusTotal = 0
  if(remainder === 1) {
    if(groupData[1].length >= 1) minusTotal = groupData[1][0]
    if(groupData[2].length >= 2) minusTotal = Math.min(minusTotal, groupData[2][0] + groupData[2][1])
  }
  if(remainder === 2) {
    if(groupData[1].length >= 2) minusTotal = groupData[1][0] + groupData[1][1]
    if(groupData[2].length >= 1) minusTotal = Math.min(minusTotal, groupData[2][0])
  }

  return allTotal - minusTotal
}

const getSum = (list, start, end) => {
  let sum = 0;
  for (let i = start; i < end; ++i) {
      sum += list[i];
  }
  return sum;
};

console.log(maxSumDivThree([3,6,5,1,8,5,9,1]))