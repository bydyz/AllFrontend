/**
 * 循环双端队列：使用数组实现，支持两端插入和删除
 * 核心思想：使用 front 和 rear 指针，通过取模运算实现循环
 * @param {number} k
 */
var MyCircularDeque = function(k) {
    this.capacity = k; // 队列容量
    this.queue = new Array(k); // 存储元素的数组
    this.front = 0; // 队头指针
    this.rear = 0; // 队尾指针
    this.size = 0; // 当前元素个数
};

/**
 * 在队头插入元素
 * @param {number} value
 * @return {boolean}
 */
MyCircularDeque.prototype.insertFront = function(value) {
    if (this.isFull()) {
        return false;
    }
    // front指针向前移动一位（循环）
    this.front = (this.front - 1 + this.capacity) % this.capacity;
    this.queue[this.front] = value;
    this.size++;
    return true;
};

/**
 * 在队尾插入元素
 * @param {number} value
 * @return {boolean}
 */
MyCircularDeque.prototype.insertLast = function(value) {
    if (this.isFull()) {
        return false;
    }
    this.queue[this.rear] = value;
    // rear指针向后移动一位（循环）
    this.rear = (this.rear + 1) % this.capacity;
    this.size++;
    return true;
};

/**
 * 删除队头元素
 * @return {boolean}
 */
MyCircularDeque.prototype.deleteFront = function() {
    if (this.isEmpty()) {
        return false;
    }
    // front指针向后移动一位（循环）
    this.front = (this.front + 1) % this.capacity;
    this.size--;
    return true;
};

/**
 * 删除队尾元素
 * @return {boolean}
 */
MyCircularDeque.prototype.deleteLast = function() {
    if (this.isEmpty()) {
        return false;
    }
    // rear指针向前移动一位（循环）
    this.rear = (this.rear - 1 + this.capacity) % this.capacity;
    this.size--;
    return true;
};

/**
 * 获取队头元素
 * @return {number}
 */
MyCircularDeque.prototype.getFront = function() {
    if (this.isEmpty()) {
        return -1;
    }
    return this.queue[this.front];
};

/**
 * 获取队尾元素
 * @return {number}
 */
MyCircularDeque.prototype.getRear = function() {
    if (this.isEmpty()) {
        return -1;
    }
    // rear指向下一个空位置，所以队尾元素在rear-1处
    return this.queue[(this.rear - 1 + this.capacity) % this.capacity];
};

/**
 * 判断队列是否为空
 * @return {boolean}
 */
MyCircularDeque.prototype.isEmpty = function() {
    return this.size === 0;
};

/**
 * 判断队列是否已满
 * @return {boolean}
 */
MyCircularDeque.prototype.isFull = function() {
    return this.size === this.capacity;
};

/*
复杂度分析：
时间复杂度：所有操作均为 O(1)
空间复杂度：O(k)，存储k个元素的数组
*/