function demonstratePrivateProperties() {
  console.log('\n=== 使用 WeakMap 模拟私有属性 ===');
  
  const privateData = new WeakMap();
  
  class BankAccount {
    constructor(accountNumber, initialBalance = 0) {
      // 公共属性
      this.accountNumber = accountNumber;
      
      // 私有数据（通过WeakMap存储）
      privateData.set(this, {
        balance: initialBalance,
        transactionHistory: [],
        isClosed: false
      });
    }
    
    // 公共方法
    deposit(amount) {
      if (this.#validateOperation(amount)) {
        const data = privateData.get(this);
        data.balance += amount;
        data.transactionHistory.push({
          type: 'DEPOSIT',
          amount,
          date: new Date(),
          balance: data.balance
        });
        return true;
      }
      return false;
    }
    
    withdraw(amount) {
      if (this.#validateOperation(amount)) {
        const data = privateData.get(this);
        if (data.balance >= amount) {
          data.balance -= amount;
          data.transactionHistory.push({
            type: 'WITHDRAWAL',
            amount,
            date: new Date(),
            balance: data.balance
          });
          return true;
        }
      }
      return false;
    }
    
    getBalance() {
      const data = privateData.get(this);
      return data.isClosed ? '账户已关闭' : data.balance;
    }
    
    closeAccount() {
      const data = privateData.get(this);
      data.isClosed = true;
      data.transactionHistory.push({
        type: 'CLOSE',
        date: new Date()
      });
    }
    
    // 私有方法（使用现代JS的私有语法）
    #validateOperation(amount) {
      const data = privateData.get(this);
      return !data.isClosed && amount > 0;
    }
  }
  
  // 使用银行账户
  const account = new BankAccount('123456', 1000);
  console.log('初始余额:', account.getBalance());
  
  account.deposit(500);
  console.log('存款后余额:', account.getBalance());
  
  account.withdraw(200);
  console.log('取款后余额:', account.getBalance());
  
  // 无法直接访问私有数据
  console.log('直接访问privateData:', privateData.get(account)); // 可以，但需要weakMap引用
  console.log('账户对象本身:', Object.keys(account)); // 只有公共属性
  
  return { BankAccount, privateData };
}

const privatePropsDemo = demonstratePrivateProperties();