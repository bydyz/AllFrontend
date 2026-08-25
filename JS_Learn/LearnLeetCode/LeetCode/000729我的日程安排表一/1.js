// 使用数组存储已预订的日程
var MyCalendar = function() {
    this.events = [];
};

/**
 * @param {number} startTime
 * @param {number} endTime
 * @return {boolean}
 */
// 预订日程，检查是否与已有日程冲突
MyCalendar.prototype.book = function(startTime, endTime) {
    // 遍历所有已预订的日程，检查是否有重叠
    for (const [start, end] of this.events) {
        // 重叠条件：新日程的开始时间小于已有日程的结束时间，且新日程的结束时间大于已有日程的开始时间
        if (Math.max(startTime, start) < Math.min(endTime, end)) {
            return false;
        }
    }
    
    // 没有重叠，将新日程添加到列表中
    this.events.push([startTime, endTime]);
    return true;
};

/*
复杂度分析：
时间复杂度：每次预订操作需要遍历所有已预订的日程，时间复杂度为 O(n)，其中 n 是已预订的日程数量。
空间复杂度：需要存储所有已预订的日程，空间复杂度为 O(n)。
*/

/**
 * Your MyCalendar object will be instantiated and called as such:
 * var obj = new MyCalendar()
 * var param_1 = obj.book(startTime,endTime)
 */