let a = new URL('https://test-lkl.cwasp.com/h5/#/')

console.log(a)

a.searchParams.set('what', 1)   //第一个需要用字符串，否则会当做变量
a.searchParams.set('the', 2)
a.searchParams.set('fuck', 3)

console.log(a)