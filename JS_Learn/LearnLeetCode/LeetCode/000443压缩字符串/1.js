var compress = function (chars) {
  const n = chars.length;
  // 一组重复字符串 后，下一个 字符 的 index；故也可算压缩后的 长度
  let write = 0
  // 一组重复字符串 最左侧 字符 的 index
  let left = 0
  for (let read = 0; read < n; read++) {
    if (read === n - 1 || chars[read] !== chars[read + 1]) {
      chars[write++] = chars[read];
      let num = read - left + 1;
      if (num > 1) {
        // 开始写 字符数 的 index；
        // 单个字符，不加数字，即不会影响后续字符；2-9个连续字符，只需加1个数字，有一个额外的空间放数字，即不会影响后续字符；10-99个连续字符，只需加2个数字，有多余2个额外的空间放数字，即不会影响后续字符；后面皆是
        const anchor = write;
        // 放置数字顺序： 最高位 -> 第二高位 -> 第三高位 -> ... -> 个位   因此需要 reverse 进行置换
        while (num > 0) {
          chars[write++] = "" + (num % 10);
          num = Math.floor(num / 10);
        }
        reverse(chars, anchor, write - 1);
      }
      left = read + 1;
    }
  }
  console.log('00000000000000000000000000000000000000000000000000000000', chars)
  return write;
};

const reverse = (chars, left, right) => {
  while (left < right) {
    const temp = chars[left];
    chars[left] = chars[right];
    chars[right] = temp;
    left++;
    right--;
  }
};

// 复杂度分析
//   时间复杂度：O(n)，其中 n 为字符串长度，我们只需要遍历该字符串一次。
//   空间复杂度：O(1)。我们只需要常数的空间保存若干变量。


console.log(compress(['a', 'b', 'b', 'a', 'a', 'a', 'b', 'b', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'c', 'c']))