abstract class BankAccount {
  private _balance: number = 0;
  private _isActive: boolean = true;
  
  // Getter
  public get balance(): number {
    return this._balance;
  }
  
  public get isActive(): boolean {
    return this._isActive;
  }
  
  // Setter
  protected set isActive(value: boolean) {
    this._isActive = value;
  }
  
  // 抽象属性通过访问器实现
  abstract get accountType(): string;
}



export {}