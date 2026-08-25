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
 * @param {number} targetSum
 * @return {boolean}
 */
var hasPathSum = function(root, targetSum) {
    // 边界情况处理
    if (!root) return false;

    // 检查是否到达叶子节点（无左右子节点）
    if (!root.left && !root.right) {
        // 叶子节点值等于剩余目标和，说明找到满足条件的路径
        return root.val === targetSum;
    }

    // 递归检查左右子树，将当前节点值从目标和中减去
    const remaining = targetSum - root.val;
    return hasPathSum(root.left, remaining) || hasPathSum(root.right, remaining);
};

/*
复杂度分析：
时间复杂度：O(n)，其中n是二叉树节点数量，每个节点访问一次
空间复杂度：O(h)，其中h是树的高度，递归栈的空间消耗，最坏情况O(n)
*/