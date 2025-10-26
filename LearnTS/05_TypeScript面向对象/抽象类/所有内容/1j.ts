abstract class Vehicle {
  // 各种属性
  public readonly vin: string;
  protected speed: number = 0;
  private manufacturer: string;
  
  // 构造函数
  constructor(vin: string, manufacturer: string) {
    this.vin = vin;
    this.manufacturer = manufacturer;
    this.initialize();
  }
  
  // 受保护的初始化方法
  protected initialize(): void {
    console.log(`Vehicle ${this.vin} initialized`);
  }
  
  // 抽象方法
  abstract accelerate(amount: number): void;
  abstract brake(): void;
}

class Car extends Vehicle {
  private gear: number = 1;
  
  // 子类构造函数必须调用 super()
  constructor(vin: string, manufacturer: string) {
    super(vin, manufacturer);
  }
  
  accelerate(amount: number): void {
    this.speed += amount;
    console.log(`Car accelerating to ${this.speed} km/h`);
  }
  
  brake(): void {
    this.speed = Math.max(0, this.speed - 10);
    console.log(`Car braking to ${this.speed} km/h`);
  }
}



export {}