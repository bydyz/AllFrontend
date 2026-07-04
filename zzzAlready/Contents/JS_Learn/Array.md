# Array

  `new Array(element0, element1, /* … ,*/ elementN)`  
  `new Array(arrayLength)`  
  不用 `new` 也可

  `Array.from(arrayLike, mapFn, thisArg)`  
    // arrayLike  
      "foo"  
      new Set(["foo", "bar", "baz", "foo"])  
      new Map([["1", "a"], ["2", "b"]])  
    // mapFn  
      (start, stop, step) => { length: (stop - start) / step + 1 }, (_, i) => start + i * step  
  `Array.fromAsync(arrayLike, mapFn, thisArg)`  
  `Array.isArray([1, 3, 5])`  
  `Array.of("foo", 2, "bar", true)`

  `Array.prototype.pop()`  
  `Array.prototype.shift()`  
  `Array.prototype.push()`  
  `Array.prototype.unshift()`  
  `Array.prototype.at()`  
  `Array.prototype.concat()`  
  `Array.prototype.copyWithin()`  
  `Array.prototype.entries()`  
  `Array.prototype.every()`  
  `Array.prototype.fill()`  
  `Array.prototype.filter()`  
  `Array.prototype.find()`  
  `Array.prototype.findIndex()`  
  `Array.prototype.findLast()`  
  `Array.prototype.findLastIndex()`  
  `Array.prototype.flat()`  
  `Array.prototype.flatMap()`  
  `Array.prototype.forEach()`  
  `Array.prototype.includes()`  
  `Array.prototype.indexOf()`  
  `Array.prototype.join()`  
  `Array.prototype.keys()`  
  `Array.prototype.lastIndexOf()`  
  `Array.prototype.map()`  
  `Array.prototype.reduce()`  
  `Array.prototype.reduceRight()`  
  `Array.prototype.reverse()`  
  `Array.prototype.slice()`  
  `Array.prototype.some()`  
  `Array.prototype.sort()`  
  `Array.prototype.splice()`  
  `Array.prototype.toLocaleString()`  
  `Array.prototype.toReversed()`  
  `Array.prototype.toSorted()`  
  `Array.prototype.toSpliced()`  
  `Array.prototype.toString()`  
  `Array.prototype.values()`  
  `Array.prototype.with()`  