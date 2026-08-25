/**
 * 双指针滑动窗口：维护一个合法的窗口区间
 * 核心思想：当窗口内某个字符的计数大于0时，说明该字符在s1中但不在窗口中，需要缩小窗口
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function(s1, s2) {
    const n = s1.length, m = s2.length;
    if (n > m) {
        return false;
    }
    
    // 计数数组：记录s1各字符的出现次数（取负值）
    const cnt = new Array(26).fill(0);
    for (let i = 0; i < n; ++i) {
        --cnt[s1[i].charCodeAt() - 'a'.charCodeAt()];
    }
    
    let left = 0; // 窗口左边界
    // 右指针遍历s2，维护窗口 [left, right]
    for (let right = 0; right < m; ++right) {
        const x = s2[right].charCodeAt() - 'a'.charCodeAt();
        ++cnt[x]; // 将s2[right]加入窗口
        
        // 当cnt[x] > 0时，说明s1中该字符不够用，需要缩小窗口
        while (cnt[x] > 0) {
            --cnt[s2[left].charCodeAt() - 'a'.charCodeAt()];
            ++left;
        }
        
        // 如果窗口大小等于s1长度，说明找到了排列
        if (right - left + 1 === n) {
            return true;
        }
    }
    return false;
};

/*
复杂度分析：
时间复杂度：O(m + n)，其中 m 是 s2 长度，n 是 s1 长度，左右指针各遍历一次
空间复杂度：O(1)，固定大小为26的数组
*/