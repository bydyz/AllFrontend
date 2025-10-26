//！   对象参数重载


interface CircleConfig {
  type: 'circle';
  radius: number;
}

interface RectangleConfig {
  type: 'rectangle';
  width: number;
  height: number;
}

interface SquareConfig {
  type: 'square';
  side: number;
}

// 重载签名
function createShape(config: CircleConfig): { area: number; perimeter: number };
function createShape(config: RectangleConfig): { area: number; perimeter: number };
function createShape(config: SquareConfig): { area: number; perimeter: number };

// 实现签名
function createShape(config: CircleConfig | RectangleConfig | SquareConfig): { area: number; perimeter: number } {
  switch (config.type) {
    case 'circle':
      return {
        area: Math.PI * config.radius ** 2,
        perimeter: 2 * Math.PI * config.radius
      };
    case 'rectangle':
      return {
        area: config.width * config.height,
        perimeter: 2 * (config.width + config.height)
      };
    case 'square':
      return {
        area: config.side ** 2,
        perimeter: 4 * config.side
      };
    default:
      throw new Error('Unknown shape type');
  }
}

// 使用
const circle = createShape({ type: 'circle', radius: 5 });
// ✅ 类型: { area: number; perimeter: number }

const rectangle = createShape({ type: 'rectangle', width: 4, height: 6 });
// ✅ 类型: { area: number; perimeter: number }

const square = createShape({ type: 'square', side: 3 });
// ✅ 类型: { area: number; perimeter: number }

console.log(circle.area);      // 78.54
console.log(rectangle.area);   // 24
console.log(square.perimeter); // 12



export {}