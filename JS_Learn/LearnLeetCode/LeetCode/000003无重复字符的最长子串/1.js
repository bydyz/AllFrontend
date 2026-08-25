/**
 * 无重复字符的最长子串
 * 算法思路：滑动窗口
 * 使用两个指针维护一个窗口 [i, rk]，窗口内的字符都不重复
 * 右指针不断向右扩展窗口，当遇到重复字符时，左指针收缩
 * @param {string} s - 输入字符串
 * @return {number} 最长无重复子串的长度
 */
var lengthOfLongestSubstring = function(s) {
    // 哈希集合，记录当前窗口内每个字符是否出现过
    const occ = new Set();
    const n = s.length;
    // 右指针，初始值为 -1，表示窗口尚未开始扩展
    let rk = -1, ans = 0;

    for (let i = 0; i < n; ++i) {
        // 左指针向右移动，移除上一个字符，缩小窗口
        if (i != 0) {
            occ.delete(s.charAt(i - 1));
        }
        // 右指针不断向右扩展，直到遇到重复字符为止
        while (rk + 1 < n && !occ.has(s.charAt(rk + 1))) {
            occ.add(s.charAt(rk + 1));
            ++rk;
        }
        // 此时 [i, rk] 是以 i 为起点的最长无重复子串
        ans = Math.max(ans, rk - i + 1);
    }
    return ans;
};

/*
复杂度分析：
时间复杂度：O(n)，其中 n 是字符串长度。左右指针各遍历一次字符串。
空间复杂度：O(字符集大小)，最坏情况下窗口包含所有不重复字符。
*/