// 验证栈序列：判断pushed序列是否能得到popped序列
var validateStackSequences = function(pushed, popped) {
    const stack = []; // 模拟栈
    let popIndex = 0; // popped序列的指针
    
    // 模拟入栈过程
    for (const value of pushed) {
        stack.push(value); // 将元素压入栈
        
        // 当栈顶元素等于下一个要弹出的元素时，连续弹出
        while (stack.length > 0 && stack[stack.length - 1] === popped[popIndex]) {
            stack.pop();
            popIndex++;
        }
    }
    
    // 如果栈为空，说明所有元素都按照popped序列的顺序成功弹出
    return stack.length === 0;
};

/*
复杂度分析：
时间复杂度：O(n)，每个元素最多入栈和出栈各一次。
空间复杂度：O(n)，栈的最大深度为n。
*/