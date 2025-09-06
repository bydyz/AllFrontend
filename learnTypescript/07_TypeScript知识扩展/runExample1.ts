//！！ 方式一：写一个与 XXX.ts 同名的 XXX.js 和 一个 XXX.d.ts 有效果        注意：仅仅里写一个 XXX.ts 和 XXX.d.ts 没有效果
import { greet } from './utils/example-library.js';
const result = greet('John');
console.log(result); // Output: Hello, John!