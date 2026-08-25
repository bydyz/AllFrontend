/**
 * 双指针原地压缩
 * 核心思想：read 指针扫描原数组，write 指针写入压缩结果
 * - 每组连续相同字符结束时，先写入字符，再将计数的各位数字倒序写入后 reverse
 * - 原地修改 chars 数组，返回压缩后的长度
 */
var compress = function (chars) {
  const n = chars.length;
  // write 指向下一个待写入位置（同时也是压缩后的长度）
  let write = 0;
  // left 标记当前连续字符组的起始位置
  let left = 0;

  for (let read = 0; read < n; read++) {
    // 到达末尾或当前字符与下一个不同时，说明一组连续字符结束
    if (read === n - 1 || chars[read] !== chars[read + 1]) {
      // 写入当前字符
      chars[write++] = chars[read];
      let num = read - left + 1;
      // 数量大于 1 时才需要写数字
      if (num > 1) {
        const anchor = write;
        // 从低位到高位逐位写入（先得到个位、十位...）
        while (num > 0) {
          chars[write++] = "" + (num % 10);
          num = Math.floor(num / 10);
        }
        // 反转数字部分，使其从高位到低位排列
        reverse(chars, anchor, write - 1);
      }
      left = read + 1;
    }
  }
  return write;
};

// 双指针反转数组
const reverse = (chars, left, right) => {
  while (left < right) {
    const temp = chars[left];
    chars[left] = chars[right];
    chars[right] = temp;
    left++;
    right--;
  }
};

/*
复杂度分析：
时间复杂度：O(n)，read 和 write 各遍历一次数组
空间复杂度：O(1)，仅使用常数个额外变量
*/