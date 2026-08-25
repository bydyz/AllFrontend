/**
 * 字母异位词分组 - 方法2：计数法
 * 算法思路：字母异位词包含相同的字符，只是顺序不同
 * 统计每个字符串中各字符出现的频次，频次相同的归为一组
 * 用长度为 26 的数组表示 26 个小写字母的频次，作为哈希表的 key
 * @param {string[]} strs - 输入字符串数组
 * @return {string[][]} 分组后的字母异位词
 */
var groupAnagrams = function(strs) {
    const map = new Object();
    for (let s of strs) {
        // 统计 26 个字母的出现次数
        const count = new Array(26).fill(0);
        for (let c of s) {
            count[c.charCodeAt() - 'a'.charCodeAt()]++;
        }
        // 以频次数组作为 key 进行分组
        map[count] ? map[count].push(s) : map[count] = [s];
    }
    return Object.values(map);
};

/*
复杂度分析：
时间复杂度：O(n * k)，其中 n 是字符串数量，k 是最长字符串长度。每个字符统计一次。
空间复杂度：O(n * k)，存储所有字符串。
*/