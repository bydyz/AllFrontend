/**
 * 固定窗口 + 差异数优化
 * 核心思想：用一个 count 数组记录窗口与 p 的字符频次差值
 * differ 记录 count 中非零位置的数量（即当前窗口与 p 还有多少种字符的频次不同）
 * differ == 0 时即为异位词
 * 滑动时根据值的变化增减 differ，避免每次都遍历整个数组比较
 */
var findAnagrams = function(s, p) {
    const sLen = s.length, pLen = p.length;

    if (sLen < pLen) {
        return [];
    }

    const ans = [];
    const count = Array(26).fill(0);
    // 初始化差异计数：s 窗口加，p 减
    for (let i = 0; i < pLen; ++i) {
        ++count[s[i].charCodeAt() - 'a'.charCodeAt()];
        --count[p[i].charCodeAt() - 'a'.charCodeAt()];
    }

    // 统计初始 differ 值
    let differ = 0;
    for (let j = 0; j < 26; ++j) {
        if (count[j] !== 0) {
            ++differ;
        }
    }

    if (differ === 0) {
        ans.push(0);
    }

    for (let i = 0; i < sLen - pLen; ++i) {
        // 移除左端字符：值从 1→0 表示该字符从"不同"变"相同"，differ--
        //              值从 0→-1 表示该字符从"相同"变"不同"，differ++
        if (count[s[i].charCodeAt() - 'a'.charCodeAt()] === 1) {
            --differ;
        } else if (count[s[i].charCodeAt() - 'a'.charCodeAt()] === 0) {
            ++differ;
        }
        --count[s[i].charCodeAt() - 'a'.charCodeAt()];

        // 添加右端字符：值从 -1→0 表示从"不同"变"相同"，differ--
        //              值从 0→1 表示从"相同"变"不同"，differ++
        if (count[s[i + pLen].charCodeAt() - 'a'.charCodeAt()] === -1) {
            --differ;
        } else if (count[s[i + pLen].charCodeAt() - 'a'.charCodeAt()] === 0) {
            ++differ;
        }
        ++count[s[i + pLen].charCodeAt() - 'a'.charCodeAt()];

        if (differ === 0) {
            ans.push(i + 1);
        }
    }

    return ans;
};

/*
复杂度分析：
时间复杂度：O(n)，只遍历一遍 s，每次滑动 O(1) 更新 differ
空间复杂度：O(Σ) = O(1)，一个长度为 26 的计数数组
*/