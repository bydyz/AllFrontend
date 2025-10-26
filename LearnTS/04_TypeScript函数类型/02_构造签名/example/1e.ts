// 工厂模式中的构造签名
interface VehicleConstructor {
  new (model: string, year: number): Vehicle;
  vehicleType: string;
  supportedModels: string[];
}

interface Vehicle {
  model: string;
  year: number;
  start(): void;
  stop(): void;
  getInfo(): string;
}

// 具体车辆类
class Car implements Vehicle {
  static vehicleType = "car";
  static supportedModels = ["Sedan", "SUV", "Coupe"];
  
  constructor(public model: string, public year: number) {}
  
  start(): void {
    console.log(`Car ${this.model} started`);
  }
  
  stop(): void {
    console.log(`Car ${this.model} stopped`);
  }
  
  getInfo(): string {
    return `Car: ${this.model} (${this.year})`;
  }
}

class Motorcycle implements Vehicle {
  static vehicleType = "motorcycle";
  static supportedModels = ["Sport", "Cruiser", "Touring"];
  
  constructor(public model: string, public year: number) {}
  
  start(): void {
    console.log(`Motorcycle ${this.model} started`);
  }
  
  stop(): void {
    console.log(`Motorcycle ${this.model} stopped`);
  }
  
  getInfo(): string {
    return `Motorcycle: ${this.model} (${this.year})`;
  }
}

// 车辆工厂
class VehicleFactory {
  private constructors = new Map<string, VehicleConstructor>();
  
  registerVehicle(type: string, ctor: VehicleConstructor): void {
    this.constructors.set(type, ctor);
  }
  
  createVehicle(type: string, model: string, year: number): Vehicle {
    const constructor = this.constructors.get(type);
    if (!constructor) {
      throw new Error(`Vehicle type ${type} not supported`);
    }
    
    if (!constructor.supportedModels.includes(model)) {
      throw new Error(`Model ${model} not supported for ${type}`);
    }
    
    return new constructor(model, year);
  }
  
  getSupportedTypes(): string[] {
    return Array.from(this.constructors.keys());
  }
}

// 使用
const factory = new VehicleFactory();
factory.registerVehicle("car", Car);
factory.registerVehicle("motorcycle", Motorcycle);

const myCar = factory.createVehicle("car", "SUV", 2023);
const myBike = factory.createVehicle("motorcycle", "Sport", 2022);

console.log(myCar.getInfo()); // "Car: SUV (2023)"
console.log(myBike.getInfo()); // "Motorcycle: Sport (2022)"

myCar.start(); // "Car SUV started"
myBike.start(); // "Motorcycle Sport started"



export {}