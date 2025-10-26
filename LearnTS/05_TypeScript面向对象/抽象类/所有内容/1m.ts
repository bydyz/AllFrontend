// 自定义装饰器
function logExecution(target: any, propertyName: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(`Executing ${propertyName} with args:`, args);
    return method.apply(this, args);
  };
}

abstract class Service {
  // 使用装饰器的方法
  @logExecution
  public executeOperation(data: any): void {
    this.validate(data);
    this.process(data);
  }
  
  // 抽象方法
  protected abstract validate(data: any): void;
  protected abstract process(data: any): void;
}

class UserService extends Service {
  protected validate(data: any): void {
    if (!data.name || !data.email) {
      throw new Error("Invalid user data");
    }
  }
  
  protected process(data: any): void {
    console.log(`Processing user: ${data.name}, ${data.email}`);
  }
}



export {}