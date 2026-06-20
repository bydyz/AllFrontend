var compress = function (chars) {
  const n = chars.length;
  let write = 0,
    left = 0;
  for (let read = 0; read < n; read++) {
    if (read === n - 1 || chars[read] !== chars[read + 1]) {
      chars[write++] = chars[read];
      let num = read - left + 1;
      if (num > 1) {
        const anchor = write;
        while (num > 0) {
          chars[write++] = "" + (num % 10);
          num = Math.floor(num / 10);
        }
        reverse(chars, anchor, write - 1);
      }
      left = read + 1;
    }
  }
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
