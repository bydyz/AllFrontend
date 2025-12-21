function processString<T extends String>(input: T): string {
    return input.toUpperCase(); // 安全调用 String 方法
}





export {}