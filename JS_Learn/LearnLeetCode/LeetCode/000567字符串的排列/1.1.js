/**
 * 优化版滑动窗口：使用差异数组减少比较开销
 * 核心思想：维护一个差异数组，记录s1和当前窗口的字符频率差
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function(s1, s2) {
    const n = s1.length, m = s2.length;
    if (n > m) {
        return false;
    }
    
    // 差异数组：cnt[i] 表示当前窗口与s1在字符i上的频率差
    const cnt = new Array(26).fill(0);
    for (let i = 0; i < n; ++i) {
        --cnt[s1[i].charCodeAt() - 'a'.charCodeAt()]; // s1的字符减去
        ++cnt[s2[i].charCodeAt() - 'a'.charCodeAt()]; // 窗口的字符加上
    }
    
    // 统计差异数组中非零元素的个数
    let diff = 0;
    for (const c of cnt) {
        if (c !== 0) {
            ++diff;
        }
    }
    
    if (diff == 0) {
        return true; // 初始窗口即匹配
    }
    
    // 滑动窗口，动态维护差异数组和diff值
    for (let i = n; i < m; ++i) {
        const x = s2[i].charCodeAt() - 'a'.charCodeAt(); // 新加入的字符
        const y = s2[i - n].charCodeAt() - 'a'.charCodeAt(); // 要移除的字符
        
        if (x == y) continue; // 相同字符无需更新
        
        // 更新新字符x的差异数组
        if (cnt[x] == 0) ++diff; // 从0变为非零，diff增加
        ++cnt[x];
        if (cnt[x] == 0) --diff; // 从非零变为0，diff减少
        
        // 更新旧字符y的差异数组
        if (cnt[y] == 0) ++diff;
        --cnt[y];
        if (cnt[y] == 0) --diff;
        
        if (diff == 0) return true; // 所有字符频率差为0，匹配成功
    }
    return false;
};

/*
复杂度分析：
时间复杂度：O(m + n)，其中 m 是 s2 长度，n 是 s1 长度，只需遍历一次
空间复杂度：O(1)，固定大小为26的数组
*/