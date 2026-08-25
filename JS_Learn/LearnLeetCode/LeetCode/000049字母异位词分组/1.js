/**
 * 字母异位词分组 - 方法1：排序法
 * 算法思路：字母异位词排序后结果相同
 * 将每个字符串排序后作为哈希表的 key，相同 key 的字符串归为一组
 * @param {string[]} strs - 输入字符串数组
 * @return {string[][]} 分组后的字母异位词
 */
var groupAnagrams = function(strs) {
    const map = new Map();
    for (let str of strs) {
        // 将字符串排序作为 key
        let array = Array.from(str);
        array.sort();
        let key = array.toString();
        // 将原字符串放入对应分组
        let list = map.get(key) ? map.get(key) : new Array();
        list.push(str);
        map.set(key, list);
    }
    return Array.from(map.values());
};

/*
复杂度分析：
时间复杂度：O(n * k * logk)，其中 n 是字符串数量，k 是最长字符串长度。排序每个字符串需要 O(k * logk)。
空间复杂度：O(n * k)，存储所有字符串。
*/