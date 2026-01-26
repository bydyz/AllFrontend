class Range {
  constructor(start, end, step = 1) {
    this.start = start;
    this.end = end;
    this.step = step;
  }

  [Symbol.iterator]() {
    let current = this.start;
    const end = this.end;
    const step = this.step;
    
    return {
      next() {
        if (current <= end) {
          const value = current;
          current += step;
          return { value, done: false };
        } else {
          return { done: true };
        }
      }
    };
  }
}

// 使用
const range = new Range(1, 5);
for (const num of range) {
  console.log(num); // 1, 2, 3, 4, 5
}