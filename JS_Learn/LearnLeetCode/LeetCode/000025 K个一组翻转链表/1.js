/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/**
 * K个一组翻转链表
 * 算法思路：
 * 1. 每次检查是否有 k 个节点可以翻转
 * 2. 如果有，翻转这 k 个节点并正确连接前后部分
 * 3. 使用哑节点简化头节点处理
 * @param {ListNode} head - 链表头节点
 * @param {number} k - 每组翻转的节点数
 * @return {ListNode} 翻转后的链表头节点
 */
var reverseKGroup = function(head, k) {
    // 边界情况：空链表或 k=1 无需翻转
    if (!head || k === 1) return head;
    
    // 哑节点，避免处理头节点的特殊情况
    const dummy = new ListNode(0);
    dummy.next = head;
    let prevGroup = dummy;
    
    while (true) {
        // 检查剩余节点是否足够 k 个
        let count = 0;
        let current = prevGroup.next;
        
        while (current && count < k) {
            count++;
            current = current.next;
        }
        
        // 不足 k 个节点，结束翻转
        if (count < k) break;
        
        // 反转当前组的 k 个节点
        let prev = null;
        current = prevGroup.next;
        
        for (let i = 0; i < k; i++) {
            const next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }
        
        // 连接反转后的组到链表中
        const tail = prevGroup.next;  // 反转前的头，反转后变成尾
        prevGroup.next = prev;        // 接上反转后的新头
        tail.next = current;          // 接上后面的节点
        
        // 移动到下一组
        prevGroup = tail;
    }
    
    return dummy.next;
};

/*
复杂度分析：
时间复杂度：O(n)，每个节点最多被访问两次（计数一次，翻转一次）。
空间复杂度：O(1)，只使用了常数个指针变量。
*/