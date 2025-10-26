abstract class SecureStorage {
  // 私有字段（ES2022+）
  #encryptionKey: string;
  #isInitialized: boolean = false;
  
  constructor(encryptionKey: string) {
    this.#encryptionKey = encryptionKey;
  }
  
  // 公共方法访问私有字段
  public initialize(): void {
    this.#isInitialized = true;
    console.log("Storage initialized with encryption");
  }
  
  // 抽象方法
  abstract store(key: string, value: any): void;
  abstract retrieve(key: string): any;
  
  // 受保护方法访问私有字段
  protected getEncryptionKey(): string {
    if (!this.#isInitialized) {
      throw new Error("Storage not initialized");
    }
    return this.#encryptionKey;
  }
}



export {}