# 代码高亮测试

这个文件用于测试代码语法高亮功能。

## JavaScript

```javascript
// 箭头函数
const add = (a, b) => a + b

// 类定义
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }

  greet() {
    return `Hello, I'm ${this.name} and I'm ${this.age} years old.`
  }
}

const person = new Person('Alice', 30)
console.log(person.greet())
```

## TypeScript

```typescript
interface User {
  id: number
  name: string
  email: string
}

function getUser(id: number): User | undefined {
  // 模拟获取用户
  return undefined
}

const user = getUser(1)
if (user) {
  console.log(user.name)
}
```

## Python

```python
def fibonacci(n):
    """生成斐波那契数列"""
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b

# 打印前 10 个斐波那契数
for num in fibonacci(10):
    print(num)
```

## CSS

```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
}
```

## HTML

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hello World</title>
</head>
<body>
  <h1>Hello World!</h1>
  <p>这是一个 HTML 示例。</p>
</body>
</html>
```
