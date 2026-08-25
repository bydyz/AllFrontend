var lengthOfLongestSubstringTwoDistinct = function(s) {
    // 哈希表，记录窗口内每个字符的出现次数
    const map = new Map();
    let left = 0, maxLen = 0;

    // 右指针向右扩展窗口
    for (let right = 0; right < s.length; right++) {
        const c = s.charAt(right);
        map.set(c, (map.get(c) || 0) + 1);

        // 当窗口内不同字符数超过2，收缩左边界直到满足条件
        while (map.size > 2) {
            const leftChar = s.charAt(left);
            map.set(leftChar, map.get(leftChar) - 1);
            // 字符计数为0时从哈希表中删除
            if (map.get(leftChar) === 0) {
                map.delete(leftChar);
            }
            left++;
        }

        // 更新最大长度
        maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;
};

/*
复杂度分析：
时间复杂度：O(n)，其中n是字符串长度，左右指针各遍历一次字符串
空间复杂度：O(1)，哈希表最多存储3个字符（窗口内最多3个不同字符时触发收缩）
*/