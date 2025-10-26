abstract class Animal {
  // 具体实例属性（有初始值）
  public name: string;
  protected age: number = 0;
  private id: string;
  
  // 只读实例属性
  public readonly species: string;
  protected readonly createdAt: Date;
  
  constructor(name: string, species: string) {
    this.name = name;
    this.species = species;
    this.id = Math.random().toString(36);
    this.createdAt = new Date();
  }
}



export {}