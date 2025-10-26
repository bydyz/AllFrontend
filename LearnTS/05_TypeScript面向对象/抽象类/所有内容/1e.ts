abstract class Logger {
  // 静态属性
  public static readonly DEFAULT_LEVEL: string = "info";
  protected static instanceCount: number = 0;
  private static instances: Logger[] = [];
  
  // 抽象类也可以有静态属性
  static getTotalInstances(): number {
    return this.instanceCount;
  }
}



export {}