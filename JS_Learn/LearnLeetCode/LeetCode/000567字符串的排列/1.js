/**
 * 滑动窗口方法：使用字符计数数组比较窗口内字符频率
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function(s1, s2) {
    const n = s1.length, m = s2.length;
    if (n > m) {
        return false; // s1比s2长，不可能有排列
    }
    
    // 计算s1和s2初始窗口的字符频率
    const cnt1 = new Array(26).fill(0);
    const cnt2 = new Array(26).fill(0);
    for (let i = 0; i < n; ++i) {
        ++cnt1[s1[i].charCodeAt() - 'a'.charCodeAt()];
        ++cnt2[s2[i].charCodeAt() - 'a'.charCodeAt()];
    }
    
    // 检查初始窗口是否匹配
    if (cnt1.toString() === cnt2.toString()) {
        return true;
    }
    
    // 滑动窗口：每次向右移动一位，更新字符频率
    for (let i = n; i < m; ++i) {
        ++cnt2[s2[i].charCodeAt() - 'a'.charCodeAt()]; // 加入新字符
        --cnt2[s2[i - n].charCodeAt() - 'a'.charCodeAt()]; // 移除旧字符
        if (cnt1.toString() === cnt2.toString()) {
            return true;
        }
    }
    return false;
};

/*
复杂度分析：
时间复杂度：O(m * n)，其中 m 是 s2 长度，n 是 s1 长度，字符串比较需要O(n)
空间复杂度：O(1)，两个固定大小为26的数组
*/