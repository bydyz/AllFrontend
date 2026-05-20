// 构建类型安全的数据处理管道
interface ProcessingStep<T, R> {
  (input: T): R;
}

function createProcessor<T extends object>(): {
  addStep<R>(step: (input: T) => R): createProcessor<R>;
  process(input: T): T;
} {
  // 实现略
  return {} as any;
}

// 正确的处理链
const processor = createProcessor<{ data: string }>()
  .addStep(input => ({ ...input, length: input.data.length }))
  .addStep(input => ({ ...input, processed: true }));



  export {}