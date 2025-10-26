abstract class Dictionary {
  // 索引签名
  [key: string]: any;
  
  // 具体属性
  public size: number = 0;
  
  // 抽象方法操作索引
  abstract add(key: string, value: any): void;
  abstract get(key: string): any;
  abstract remove(key: string): boolean;
}

class StringDictionary extends Dictionary {
  private data: { [key: string]: string } = {};
  
  add(key: string, value: string): void {
    this.data[key] = value;
    this.size++;
  }
  
  get(key: string): string {
    return this.data[key];
  }
  
  remove(key: string): boolean {
    if (key in this.data) {
      delete this.data[key];
      this.size--;
      return true;
    }
    return false;
  }
}



export {}