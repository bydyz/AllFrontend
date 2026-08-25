/**
 * @param {number[]} nums
 * @return {number}
 */
// var maxSumDivThree = function(num) {
//   var groupData = [[], [], []]
//   var groupData1 = null
//   var groupData2 = null
//   num.forEach(item => {
//     groupData[item % 3].push(item)
//   });
//   console.log(groupData[1], groupData[2])

//   // 这里值考虑了从大到小选择数目，没考虑有多种情况，这些情况的和的大小也需比较，如  2, 2可   0, 3可   但是0, 3情况比较大
//   for(var i = groupData[1].length; i >= groupData[1].length - 2 && i >= 0; i--) {
//     for(var j = groupData[2].length; j >= groupData[2].length - 2 && j >= 0; j--) {
//       console.log(i, j)
//       if((i*1 + j*2) % 3 === 0) {
//         groupData1 = i
//         groupData2 = j
//         break
//       }
//     }
//     break
//   }

//   console.log('余数为1或2的个数为', groupData1, groupData2)
//   groupData[1].sort((a, b) => b - a)
//   groupData[2].sort((a, b) => b - a)
//   groupData[1] = groupData[1].splice(0, groupData1)
//   groupData[2] = groupData[2].splice(0, groupData2)
//   groupData[0] = groupData[0].concat(groupData[1]).concat(groupData[2])
//   console.log(groupData[0])

//   let total = 0
//   groupData[0].forEach((item => {
//     total += item
//   }))

//   return total
// };

// console.log(maxSumDivThree([3,6,5,1,8,5,9,1]))













// var maxSumDivThree = function(num) {
//   var groupData = [[], [], []]
//   var allStatusAdd = []
//   num.forEach(item => {
//     groupData[item % 3].push(item)
//   });
//   console.log(groupData[0], groupData[1], groupData[2])

//   groupData[1].sort((a, b) => b - a)
//   groupData[2].sort((a, b) => b - a)

//   // 这里需要算出所有的情况下的和
//   for(var i = groupData[1].length; i >= groupData[1].length - 2 && i >= 0; i--) {
//     for(var j = groupData[2].length; j >= groupData[2].length - 2 && j >= 0; j--) {
//       if((i*1 + j*2) % 3 === 0) {
//         var groupData1 = i
//         var groupData2 = j
//         console.log('可能的取余数为1,2的情况', groupData1, groupData2)
//         var total1 = 0
//         var total2 = 0
//         if(groupData1 > 0) total1 = getSum(groupData[1], 0, groupData1 - 1)
//         if(groupData2 > 0) total2 = getSum(groupData[2], 0, groupData2 - 1)
//         var total = total1 + total2
//         allStatusAdd.push(total)
//       }
//     }
//   }

//   return allStatusAdd.sort((a, b) => b - a)[0] + getSum(groupData[0], 0, groupData[0].length - 1)

// };

// var getSum = function(list, start, end) {
//   console.log(list, start, end)
//   var total = 0
//   for(var i = start; i <= end; i++) {
//     total += list[i]
//   }
//   console.log(total)
//   return total
// }



// console.log(maxSumDivThree([3,6,5,1,8,5,9,1]))













// 动态规划思想：按余数分组，寻找最优组合
var maxSumDivThree = function(nums) {
  // 按余数分为三组：余0、余1、余2
  const v = [[], [], []];
  for (const num of nums) {
      v[num % 3].push(num);
  }
  // 余1和余2的组按降序排列，便于取前k个最大值
  v[1].sort((a, b) => b - a);
  v[2].sort((a, b) => b - a);

  let ans = 0;
  const lb = v[1].length;
  const lc = v[2].length;
  // 尝试从余1组取cntb个，从余2组取cntc个，使得(cntb + cntc*2) % 3 === 0
  for (let cntb = lb - 2; cntb <= lb; ++cntb) {
      if (cntb >= 0) {
          for (let cntc = lc - 2; cntc <= lc; ++cntc) {
              // (cntb - cntc) % 3 === 0 等价于 (cntb + cntc*2) % 3 === 0
              if (cntc >= 0 && (cntb - cntc) % 3 === 0) {
                  ans = Math.max(ans, getSum(v[1], 0, cntb) + getSum(v[2], 0, cntc));
              }
          }
      }
  }
  // 加上所有余数为0的数（它们一定可以被3整除）
  return ans + getSum(v[0], 0, v[0].length);
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

