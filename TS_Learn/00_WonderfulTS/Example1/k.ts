// 根据输入决定是否添加属性
function processObject<T extends object>(
  obj: T, 
  addProcessed: boolean = true
): T & (typeof addProcessed extends true ? { processed: boolean } : {}) {
  return addProcessed 
    ? { ...obj, processed: true } as any
    : obj as any;
}

const user = { name: 'John' };
const withFlag = processObject(user, true);
// 类型: { name: string; } & { processed: boolean; }

const withoutFlag = processObject(user, false);
// 类型: { name: string; }


export {}