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
var isSymmetric = function(root) {
    // 判断两棵树是否互为镜像
    function isMirror(left, right) {
        // 如果两个节点都为空，是对称的
        if (!left && !right) return true;

        // 如果只有一个节点为空，不对称
        if (!left || !right) return false;

        // 比较节点值，并递归比较：
        // 左子树的左节点 vs 右子树的右节点（外侧）
        // 左子树的右节点 vs 右子树的左节点（内侧）
        return left.val === right.val &&
               isMirror(left.left, right.right) &&
               isMirror(left.right, right.left);
    }

    // 空树是对称的
    if (!root) return true;

    // 检查左右子树是否镜像对称
    return isMirror(root.left, root.right);
};

/*
复杂度分析：
时间复杂度：O(n)，其中n是二叉树节点数量，每个节点访问一次
空间复杂度：O(h)，其中h是树的高度，递归栈的空间消耗，最坏情况O(n)
*/