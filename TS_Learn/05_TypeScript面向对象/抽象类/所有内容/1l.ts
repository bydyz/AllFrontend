abstract class DataProcessor {
  // 方法重载签名
  process(data: string): string;
  process(data: number): number;
  process(data: string[]): string[];
  
  // 实现签名
  process(data: any): any {
    if (typeof data === 'string') {
      return this.processString(data);
    } else if (typeof data === 'number') {
      return this.processNumber(data);
    } else if (Array.isArray(data)) {
      return this.processArray(data);
    }
    throw new Error('Unsupported data type');
  }
  
  // 抽象方法
  protected abstract processString(data: string): string;
  protected abstract processNumber(data: number): number;
  protected abstract processArray(data: string[]): string[];
}

class UpperCaseProcessor extends DataProcessor {
  protected processString(data: string): string {
    return data.toUpperCase();
  }
  
  protected processNumber(data: number): number {
    return data * 2;
  }
  
  protected processArray(data: string[]): string[] {
    return data.map(item => item.toUpperCase());
  }
}



export {}