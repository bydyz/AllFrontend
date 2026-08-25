/**
 * 贪心 + 插入排序
 * 核心思想：先按身高降序排序，再按 k 值升序排序
 * 排序后依次将每个人插入 result 的第 k 个位置
 * 因为先插入高个子，后面插入矮个子时不会影响已有高个子的 k 值
 */
var reconstructQueue = function(people) {
    // 按身高降序排序，如果身高相同则按k升序排序
    people.sort((a, b) => {
        if (a[0] !== b[0]) {
            return b[0] - a[0];
        }
        return a[1] - b[1];
    });
    
    const result = [];
    
    // 按k值插入到结果数组中
    for (const person of people) {
        result.splice(person[1], 0, person);
    }
    
    return result;
};

/*
复杂度分析：
时间复杂度：O(n^2)，排序 O(n log n) + 插入操作 O(n) 次 splice 每次 O(n)
空间复杂度：O(log n)，排序的递归栈空间（原地排序）
*/