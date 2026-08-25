// 有序队列：根据k的值决定字符串的排列方式
var orderlyQueue = function(s, k) {
    if (k > 1) {
        // 如果k > 1，可以任意重排字符串，直接排序返回最小字典序
        return s.split('').sort().join('');
    } else {
        // 如果k = 1，只能将第一个字符移到末尾，需要找到所有旋转中字典序最小的
        let smallest = s;
        for (let i = 1; i < s.length; i++) {
            const rotated = s.slice(i) + s.slice(0, i); // 旋转字符串
            if (rotated < smallest) {
                smallest = rotated;
            }
        }
        return smallest;
    }
};

/*
复杂度分析：
时间复杂度：k > 1 时为 O(n log n)（排序），k = 1 时为 O(n^2)（比较n次旋转，每次比较长度为n）。
空间复杂度：k > 1 时为 O(n)（排序需要额外空间），k = 1 时为 O(n)（存储旋转字符串）。
*/