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
 * @return {boolean}
 */
var isValidBST = function(root) {
    // 递归验证，维护每个节点的有效值范围
    function validate(node, min, max) {
        if (!node) return true;

        // 检查当前节点值是否在有效范围内
        // 左子树的所有节点必须小于当前节点，右子树的所有节点必须大于当前节点
        if (min !== null && node.val <= min) return false;
        if (max !== null && node.val >= max) return false;

        // 递归验证左右子树，传递更新后的边界值
        return validate(node.left, min, node.val) &&
               validate(node.right, node.val, max);
    }

    return validate(root, null, null);
};

/*
复杂度分析：
时间复杂度：O(n)，其中n是二叉树节点数量，每个节点访问一次
空间复杂度：O(h)，其中h是树的高度，递归栈的空间消耗
*/