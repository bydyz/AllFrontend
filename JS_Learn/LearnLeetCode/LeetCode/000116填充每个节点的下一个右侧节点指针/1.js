/**
 * // Definition for a Node.
 * function Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */

/**
 * @param {Node} root
 * @return {Node}
 */
var connect = function(root) {
    if (!root) return null;

    // 使用队列进行层序遍历（BFS）
    const queue = [root];

    while (queue.length > 0) {
        const levelSize = queue.length;

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();

            // 将当前节点与队列中下一个节点连接（同一层的相邻节点）
            if (i < levelSize - 1) {
                node.next = queue[0];
            }

            // 将子节点加入队列
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }

    return root;
};

/*
复杂度分析：
时间复杂度：O(n)，其中n是二叉树节点数量，每个节点入队出队一次
空间复杂度：O(n)，队列中最多存储一层的节点，完全二叉树最后一层为n/2
*/