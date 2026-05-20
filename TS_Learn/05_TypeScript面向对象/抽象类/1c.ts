abstract class Employee {
  // 抽象属性
  abstract role: string;
  
  // 在构造函数中使用参数属性
  constructor(
    public readonly id: string,
    public name: string,
    protected baseSalary: number
  ) {}
  
  // 抽象方法
  abstract calculateSalary(): number;
  abstract work(): void;
  
  // 具体方法
  getDetails(): string {
    return `${this.name} (${this.id}) - ${this.role}`;
  }
  
  // 受保护的具体方法
  protected calculateBonus(): number {
    return this.baseSalary * 0.1; // 10% 奖金
  }
}

class Developer extends Employee {
  role: string = "Developer";
  private programmingLanguages: string[];
  
  constructor(
    id: string, 
    name: string, 
    baseSalary: number, 
    languages: string[]
  ) {
    super(id, name, baseSalary);
    this.programmingLanguages = languages;
  }
  
  calculateSalary(): number {
    const experienceBonus = this.programmingLanguages.length * 1000;
    return this.baseSalary + this.calculateBonus() + experienceBonus;
  }
  
  work(): void {
    console.log(`${this.name} is writing code in ${this.programmingLanguages.join(", ")}`);
  }
  
  // 额外方法
  addLanguage(language: string): void {
    if (!this.programmingLanguages.includes(language)) {
      this.programmingLanguages.push(language);
    }
  }
}

class Manager extends Employee {
  role: string = "Manager";
  private teamSize: number;
  
  constructor(id: string, name: string, baseSalary: number, teamSize: number) {
    super(id, name, baseSalary);
    this.teamSize = teamSize;
  }
  
  calculateSalary(): number {
    const teamBonus = this.teamSize * 500;
    return this.baseSalary + this.calculateBonus() + teamBonus;
  }
  
  work(): void {
    console.log(`${this.name} is managing a team of ${this.teamSize} people`);
  }
  
  // 重写受保护的方法
  protected calculateBonus(): number {
    return this.baseSalary * 0.15; // 经理有 15% 奖金
  }
}

// 使用
const dev = new Developer("DEV001", "Alice", 50000, ["TypeScript", "JavaScript"]);
const manager = new Manager("MGR001", "Bob", 70000, 5);

console.log(dev.getDetails());        // "Alice (DEV001) - Developer"
console.log(dev.calculateSalary());   // 50000 + 5000 + 2000 = 57000
dev.work();                           // "Alice is writing code in TypeScript, JavaScript"

console.log(manager.getDetails());    // "Bob (MGR001) - Manager"
console.log(manager.calculateSalary()); // 70000 + 10500 + 2500 = 83000
manager.work();                       // "Bob is managing a team of 5 people"



export {}