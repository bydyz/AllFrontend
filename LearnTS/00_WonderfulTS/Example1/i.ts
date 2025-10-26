// 正确的不可变更新
function updateWithStatus<T extends object>(
  obj: T, 
  status: 'pending' | 'success' | 'error'
): T & { status: string; updatedAt: Date } {
  return {
    ...obj,
    status,
    updatedAt: new Date()
  };
}

const task = { id: 1, title: 'Learn TypeScript' };
const updatedTask = updateWithStatus(task, 'success');

// 类型安全访问
console.log(updatedTask.title);    // "Learn TypeScript"
console.log(updatedTask.status);   // "success"
console.log(updatedTask.updatedAt); // Date 对象


export {}