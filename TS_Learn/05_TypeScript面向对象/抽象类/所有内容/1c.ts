abstract class DatabaseEntity {
  public id: string;
  
  // 具体公共方法
  public getId(): string {
    return this.id;
  }
  
  // 具体受保护方法
  protected validate(): boolean {
    return this.id !== undefined && this.id.length > 0;
  }
  
  // 具体私有方法
  private generateId(): string {
    return `entity_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
  
  // 构造函数中使用私有方法
  constructor() {
    this.id = this.generateId();
  }
}



export {}