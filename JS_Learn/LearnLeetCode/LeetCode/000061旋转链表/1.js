/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * 旋转链表
 * 算法思路：成环再断开
 * 1. 将链表连成环
 * 2. 找到新的断开点（第 length-k 个节点）
 * 3. 断开环，返回新的头节点
 * @param {ListNode} head - 链表头节点
 * @param {number} k - 旋转位移
 * @return {ListNode} 旋转后的链表头节点
 */
var rotateRight = function(head, k) {
    if (!head || !head.next || k === 0) return head;
    
    // 计算链表长度，同时定位尾节点
    let length = 1;
    let tail = head;
    while (tail.next) {
        tail = tail.next;
        length++;
    }
    
    // 取模优化，避免无效的完整旋转
    k = k % length;
    if (k === 0) return head;
    
    // 将链表首尾相连形成环
    tail.next = head;
    
    // 找到新的尾节点：从 head 走 length-k-1 步
    let newTail = head;
    for (let i = 0; i < length - k - 1; i++) {
        newTail = newTail.next;
    }
    
    // 新头节点就是新尾节点的下一个
    const newHead = newTail.next;
    // 断开环
    newTail.next = null;
    
    return newHead;
};

/*
复杂度分析：
时间复杂度：O(n)，遍历链表一次计算长度，再走 length-k 步找断点。
空间复杂度：O(1)，只使用了常数个指针变量。
*/