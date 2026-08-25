/**
 * 串联所有单词的子串
 * 算法思路：滑动窗口 + 哈希表
 * 所有单词长度相同为 n，总长度为 m*n
 * 以每个偏移量 i (0~n-1) 为起点，维护一个长度为 m*n 的窗口
 * 用 differ Map 记录窗口中单词与 words 的频次差，为 0 则匹配成功
 * @param {string} s - 输入字符串
 * @param {string[]} words - 单词数组
 * @return {number[]} 所有匹配的起始索引
 */
var findSubstring = function(s, words) {
    const res = [];
    const m = words.length, n = words[0].length, ls = s.length;
    
    // 尝试 n 种不同的起始偏移量
    for (let i = 0; i < n; i++) {
        if (i + m * n > ls) break;
        
        // differ 记录当前窗口中单词频次与目标单词频次的差值
        const differ = new Map();
        
        // 初始化第一个窗口
        for (let j = 0; j < m; j++) {
            const word = s.substring(i + j * n, i + (j + 1) * n);
            differ.set(word, (differ.get(word) || 0) + 1);
        }
        for (const word of words) {
            differ.set(word, (differ.get(word) || 0) - 1);
            if (differ.get(word) === 0) differ.delete(word);
        }
        
        // 滑动窗口：每次向右移动一个单词长度
        for (let start = i; start < ls - m * n + 1; start += n) {
            if (start !== i) {
                // 新进入窗口的单词
                let word = s.substring(start + (m - 1) * n, start + m * n);
                differ.set(word, (differ.get(word) || 0) + 1);
                if (differ.get(word) === 0) differ.delete(word);
                // 离开窗口的单词
                word = s.substring(start - n, start);
                differ.set(word, (differ.get(word) || 0) - 1);
                if (differ.get(word) === 0) differ.delete(word);
            }
            // differ 为空说明窗口内单词与 words 完全匹配
            if (differ.size === 0) {
                res.push(start);
            }
        }
    }
    return res;
};

/*
复杂度分析：
时间复杂度：O(n * (m + ls/n))，即 O(ls * n)，其中 ls 是字符串长度，n 是单词长度。
空间复杂度：O(m * n)，哈希表最多存储 m 个单词。
*/