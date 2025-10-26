abstract class Config {
  // 抽象getter（子类必须实现）
  abstract get apiUrl(): string;
  abstract get timeout(): number;
  
  // 抽象setter
  abstract set debugMode(value: boolean);
}



export {}