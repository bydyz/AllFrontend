// 最大频率栈：支持push和pop操作，pop时返回当前频率最高的元素
var FreqStack = function() {
    this.freqMap = new Map(); // 存储每个值的出现频率
    this.groupMap = new Map(); // 存储每个频率对应的元素栈
    this.maxFreq = 0; // 当前最大频率
};

/**
 * @param {number} val
 * @return {void}
 */
// 将元素压入栈中
FreqStack.prototype.push = function(val) {
    // 更新该元素的频率
    const freq = (this.freqMap.get(val) || 0) + 1;
    this.freqMap.set(val, freq);
    
    // 更新最大频率
    this.maxFreq = Math.max(this.maxFreq, freq);
    
    // 将值放入对应频率的栈中
    if (!this.groupMap.has(freq)) {
        this.groupMap.set(freq, []);
    }
    this.groupMap.get(freq).push(val);
};

/**
 * @return {number}
 */
// 弹出当前频率最高的元素
FreqStack.prototype.pop = function() {
    // 获取最大频率对应的栈
    const stack = this.groupMap.get(this.maxFreq);
    const val = stack.pop(); // 弹出栈顶元素
    
    // 更新该元素的频率
    this.freqMap.set(val, this.freqMap.get(val) - 1);
    
    // 如果当前频率的栈为空，减少最大频率
    if (stack.length === 0) {
        this.maxFreq--;
    }
    
    return val;
};

/**
 * Your FreqStack object will be instantiated and called as such:
 * var obj = new FreqStack()
 * obj.push(val)
 * var param_2 = obj.pop()
 */

/*
复杂度分析：
时间复杂度：push和pop操作均为 O(1)。
空间复杂度：O(n)，其中 n 是栈中元素的数量。
*/