var partition = function(head, x) {
    // 创建两个虚拟头节点，分别存放小于x和大于等于x的节点
    let lessHead = new ListNode(0);
    let greaterHead = new ListNode(0);
    let lessTail = lessHead;
    let greaterTail = greaterHead;

    // 遍历原链表，将节点分到两个链表中
    while (head) {
        if (head.val < x) {
            lessTail.next = head;
            lessTail = lessTail.next;
        } else {
            greaterTail.next = head;
            greaterTail = greaterTail.next;
        }
        head = head.next;
    }

    // 连接两个链表：小于x的链表接上大于等于x的链表
    lessTail.next = greaterHead.next;
    // 断开大于等于x链表的尾部，防止成环
    greaterTail.next = null;

    return lessHead.next;
};

/*
复杂度分析：
时间复杂度：O(n)，其中n是链表节点数量，只需遍历一次链表
空间复杂度：O(1)，只使用了常数个指针变量
*/