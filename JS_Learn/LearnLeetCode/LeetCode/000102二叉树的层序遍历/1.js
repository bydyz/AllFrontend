/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
    const result = [];

    // 边界情况处理
    if (!root) return result;

    // 使用队列进行广度优先搜索（BFS）
    const queue = [root];

    while (queue.length > 0) {
        // 记录当前层的节点数量
        const levelSize = queue.length;
        const currentLevel = [];

        // 处理当前层的所有节点
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            currentLevel.push(node.val);

            // 将下一层的子节点加入队列
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        result.push(currentLevel);
    }

    return result;
};

/*
复杂度分析：
时间复杂度：O(n)，其中n是二叉树节点数量，每个节点入队出队一次
空间复杂度：O(n)，队列中最多存储一层的节点，最坏情况为n/2个节点
*/