/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {
    // 创建哈希表存储中序遍历值到索引的映射，用于快速定位根节点
    const inorderMap = new Map();
    for (let i = 0; i < inorder.length; i++) {
        inorderMap.set(inorder[i], i);
    }

    let preorderIndex = 0;

    function build(left, right) {
        if (left > right) return null;

        // 从前序遍历中获取当前根节点值（前序遍历第一个元素是根）
        const rootVal = preorder[preorderIndex++];
        const root = new TreeNode(rootVal);

        // 在中序遍历中找到根节点的位置，划分左右子树
        const mid = inorderMap.get(rootVal);

        // 先构建左子树，再构建右子树（中序遍历中根节点左侧是左子树，右侧是右子树）
        root.left = build(left, mid - 1);
        root.right = build(mid + 1, right);

        return root;
    }

    return build(0, inorder.length - 1);
};

/*
复杂度分析：
时间复杂度：O(n)，其中n是树节点数量，每个节点构建一次，哈希表查找O(1)
空间复杂度：O(n)，哈希表存储n个元素，递归栈最坏情况O(n)
*/