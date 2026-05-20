function isArrayLike(obj) {
    // 1. 不能是null/undefined
    if (obj == null) return false;
    
    // 2. 必须有length属性且是数字
    if (typeof obj.length !== 'number') return false;
    
    // 3. length应该是非负整数
    if (obj.length < 0) return false;
    if (obj.length !== Math.floor(obj.length)) return false;
    
    // 4. 如果length为0，不需要进一步检查
    if (obj.length === 0) return true;
    
    // 5. 最后一个索引应该存在（对于密集数组）
    // 可选：检查 obj[obj.length - 1] 是否存在
    
    return true;
}

// 更简单的检查
function isArrayLikeSimple(obj) {
    return obj != null 
        && typeof obj.length === 'number'
        && obj.length >= 0
        && obj.length === Math.floor(obj.length);
}