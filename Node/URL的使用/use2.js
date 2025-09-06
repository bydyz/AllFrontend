let a = new URL('https://test-lkl.cwasp.com/h5/#/')

console.log(a)

a.search = '?what/the/fuck/'          // searchParams: URLSearchParams { 'what/the/fuck/' => '' },

console.log(a)

a.search = '?what=1&the=2&fuck=3'        //  searchParams: URLSearchParams { 'what' => '1', 'the' => '2', 'fuck' => '3' },

console.log(a)