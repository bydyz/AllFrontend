/**
 * 固定窗口 + 计数数组比较
 * 核心思想：维护长度为 pLen 的滑动窗口，统计窗口内字符频次与 p 的频次是否相同
 * - 先初始化第一个窗口的 sCount 和 pCount
 * - 然后滑动窗口：左端字符计数减一，右端新字符计数加一
 * - 通过 toString() 比较两个计数数组是否相等
 */
var findAnagrams = function(s, p) {
    const sLen = s.length, pLen = p.length;

    if (sLen < pLen) {
        return [];
    }

    const ans = [];
    const sCount = new Array(26).fill(0);
    const pCount = new Array(26).fill(0);
    // 初始化第一个窗口和 p 的计数
    for (let i = 0; i < pLen; ++i) {
        ++sCount[s[i].charCodeAt() - 'a'.charCodeAt()];
        ++pCount[p[i].charCodeAt() - 'a'.charCodeAt()];
    }

    if (sCount.toString() === pCount.toString()) {
        ans.push(0);
    }

    // 滑动窗口：移除左端字符，添加右端字符
    for (let i = 0; i < sLen - pLen; ++i) {
        --sCount[s[i].charCodeAt() - 'a'.charCodeAt()];
        ++sCount[s[i + pLen].charCodeAt() - 'a'.charCodeAt()];

        if (sCount.toString() === pCount.toString()) {
            ans.push(i + 1);
        }
    }

    return ans;
};

/*
复杂度分析：
时间复杂度：O(n * Σ)，n 为 s 长度，Σ=26 为字符集大小（每次比较计数数组需要 O(26)）
空间复杂度：O(Σ) = O(1)，两个长度为 26 的计数数组
*/