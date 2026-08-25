// 使用差分数组思想记录日程的开始和结束点
var MyCalendarThree = function() {
    this.events = new Map(); // key: 时间点, value: 差分值（+1表示开始，-1表示结束）
};

MyCalendarThree.prototype.book = function(start, end) {
    // 使用差分数组思想：在start处+1表示一个日程开始，在end处-1表示一个日程结束
    this.events.set(start, (this.events.get(start) || 0) + 1);
    this.events.set(end, (this.events.get(end) || 0) - 1);
    
    // 计算最大重叠次数
    let maxOverlap = 0;
    let currentOverlap = 0;
    
    // 按时间顺序遍历所有事件点，计算当前的最大重叠数
    const sortedEvents = Array.from(this.events.entries()).sort((a, b) => a[0] - b[0]);
    
    for (const [time, count] of sortedEvents) {
        currentOverlap += count; // 累加差分值
        maxOverlap = Math.max(maxOverlap, currentOverlap);
    }
    
    return maxOverlap;
};

/*
复杂度分析：
时间复杂度：每次预订操作需要对所有时间点进行排序和遍历，时间复杂度为 O(n log n)，其中 n 是已记录的时间点数量。
空间复杂度：需要存储所有时间点的差分值，空间复杂度为 O(n)。
*/

/**
 * Your MyCalendarThree object will be instantiated and called as such:
 * var obj = new MyCalendarThree()
 * var param_1 = obj.book(startTime,endTime)
 */