interface IPersonGreetDefault {
  greet(): string;
}

interface IPersonGreetLanguage {
  greet(language: string): string;
}

class Person implements IPersonGreetDefault, IPersonGreetLanguage {
  constructor(public name: string) {}

  // 定义重载签名
  greet(): string;
  greet(language: string): string;
  //！ 重载签名：
  //   在 greet 方法的定义上，我们首先声明了两个重载签名：一个不带参数的 greet() 和一个带 language 参数的 greet(language: string)。
  //   这些重载签名告诉 TypeScript 编译器，greet 方法有两种调用方式。



  greet(language?: string): string {
    if (language === undefined) {
      return this.defaultGreeting();
    } else {
      return this.languageSpecificGreeting(language);
    }
  }

  // 实际的逻辑处理方法
  private defaultGreeting(): string {
    return `Hello, my name is ${this.name}.`;
  }

  private languageSpecificGreeting(language: string): string {
    // 这里可以根据语言参数返回不同的问候语
    return `Hello (${language}), my name is ${this.name}.`;
  }
  //！ 统一的实现：
  //   实际的 greet 方法实现接受一个可选的 language 参数。根据是否存在 language 参数，它会调用不同的私有方法来生成问候语。
  //   defaultGreeting 和 languageSpecificGreeting 是私有方法，用于封装具体的逻辑，避免重复代码。
}


export {}
