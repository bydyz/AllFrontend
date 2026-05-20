function foo<T, E>(arg1: T, arg2: E) {

}

// foo<number, number>(10, 20)
foo(10, 20)

// foo<number, string>(10, "abc")
foo(10, "abc")

// foo<string, { name: string }>("abc", { name: "why" })
foo("abc", { name: "why" })

export {}
