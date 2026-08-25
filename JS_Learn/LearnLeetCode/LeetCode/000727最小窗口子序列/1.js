/**
 * 双指针方法：正向扫描找到匹配，反向扫描缩短窗口
 * 核心思想：先正向找到s2的完整匹配，再反向从匹配终点往回找，得到最短窗口
 * @param {string} s1
 * @param {string} s2
 * @return {string}
 */
var minWindow = function(s1, s2) {
    const m = s1.length, n = s2.length;
    let minLen = Infinity, start = -1;

    for (let i = 0; i < m; i++) {
        // 正向扫描：从 s1[i] 开始匹配 s2
        if (s1[i] !== s2[0]) continue;

        let j = 0; // s2 指针
        let k = i; // s1 指针
        // 正向匹配s2的所有字符
        while (k < m && j < n) {
            if (s1[k] === s2[j]) j++;
            k++;
        }

        // 未匹配完s2，说明从i开始无法匹配完整s2
        if (j < n) continue;

        // 反向扫描：从匹配终点 k-1 往回找，尽可能缩短窗口
        let end = k; // 匹配结束位置（k 已经多走了一步）
        j = n - 1; // s2指针从末尾开始
        k = end - 1; // s1指针从匹配终点前一位开始
        // 反向匹配，找到窗口的起始位置
        while (j >= 0) {
            if (s1[k] === s2[j]) j--;
            k--;
        }
        let windowStart = k + 1; // 窗口起始位置

        // 更新最小区间
        if (end - windowStart < minLen) {
            minLen = end - windowStart;
            start = windowStart;
        }
    }

    return start === -1 ? "" : s1.substring(start, start + minLen + 1);
};

/*
复杂度分析：
时间复杂度：O(m * n)，其中 m 是 s1 长度，n 是 s2 长度，最坏情况对每个位置进行正向和反向扫描
空间复杂度：O(1)，只使用常数额外空间
*/