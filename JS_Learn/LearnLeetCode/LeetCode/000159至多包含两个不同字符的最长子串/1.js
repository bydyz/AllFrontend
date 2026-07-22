var lengthOfLongestSubstringTwoDistinct = function(s) {
    // 哈希表，记录窗口内每个字符的出现次数
    const map = new Map();
    let left = 0, maxLen = 0;

    for (let right = 0; right < s.length; right++) {
        const c = s.charAt(right);
        map.set(c, (map.get(c) || 0) + 1);

        // 当窗口内不同字符数超过 2，收缩左边界
        while (map.size > 2) {
            const leftChar = s.charAt(left);
            map.set(leftChar, map.get(leftChar) - 1);
            if (map.get(leftChar) === 0) {
                map.delete(leftChar);
            }
            left++;
        }

        maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;
};
