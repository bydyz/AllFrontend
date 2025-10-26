abstract class Validator {
  // 静态方法
  public static validateEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  
  protected static logValidation(validator: string, result: boolean): void {
    console.log(`[${validator}] Validation result: ${result}`);
  }
  
  // 抽象静态方法（TypeScript 4.2+）
  static abstract createDefault(): Validator;
}



export {}