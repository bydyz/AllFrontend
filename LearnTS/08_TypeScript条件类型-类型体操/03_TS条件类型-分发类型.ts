type toArray<T> = T extends any ? T[] : never

type NumArray = toArray<number>
type NumArray1 = toArray<null>
type NumArray2 = toArray<undefined>


//! number[] | string[] 而不是 (number|string)[]
type NumAndStrArray = toArray<number|string>

let a: NumAndStrArray = [ 1, 2 ]
let a1: NumAndStrArray = [ '1', '2' ]
let a2: NumAndStrArray = [ 1, '2' ]


// number extends any    true