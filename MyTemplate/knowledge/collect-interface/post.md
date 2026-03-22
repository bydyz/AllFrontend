在构建 RESTful API 时，POST 请求用于向服务器发送数据以创建资源或处理数据。根据不同的场景和需求，POST 请求可以有多种方式传递参数。以下是几种常见的传参方式及其适用场景，并附带详细的例子。

@ModelAttribute
@RequestParam
@PathVariable
@RequestBody
@RequestHeader

### 1 表单数据（application/x-www-form-urlencoded）

这是最常见的 POST 请求传参方式之一，适用于简单的键值对形式的数据传输，如登录表单或注册表单。


前端示例（HTML + JavaScript）

```Html
<form action="/login" method="post">
    <input type="text" name="username" placeholder="Username" required>
    <input type="password" name="password" placeholder="Password" required>
    <button type="submit">Login</button>
</form>

<!-- 或者使用 JavaScript 发送请求 -->
<script>
fetch('/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
        'username': 'user123',
        'password': 'pass456'
    })
});
</script>
```


后端解析（Spring Boot）

```java
@PostMapping("/login")
public ResponseEntity<String> login(@RequestParam String username, @RequestParam String password) {
    // 处理登录逻辑
    return ResponseEntity.ok("Login successful");
}
```



### 2 JSON 数据（application/json）

当需要传递复杂的数据结构（如对象、数组等）时，通常会使用 JSON 格式。这种方式非常适合前后端分离的应用程序。


前端示例（JavaScript）

```JavaScript
fetch('/api/users', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        "name": "John Doe",
        "email": "john.doe@example.com",
        "roles": ["admin", "editor"]
    })
});
```

后端解析（Spring Boot）

```java
@PostMapping("/api/users")
public ResponseEntity<User> createUser(@RequestBody User user) {
    // 处理用户创建逻辑
    userRepository.save(user);
    return ResponseEntity.status(HttpStatus.CREATED).body(user);
}
```


### 3 文件上传（multipart/form-data）

当需要上传文件（如图片、文档等）时，通常会使用 multipart/form-data 类型的 POST 请求。


前端示例（HTML + JavaScript）

```Html
<form action="/upload" method="post" enctype="multipart/form-data">
    <input type="file" name="file" required>
    <button type="submit">Upload</button>
</form>

<!-- 或者使用 JavaScript 发送请求 -->
<script>
const formData = new FormData();
formData.append('file', document.querySelector('input[type="file"]').files[0]);

fetch('/upload', {
    method: 'POST',
    body: formData
});
</script>
```

后端解析（Spring Boot）

```java
@PostMapping("/upload")
public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
    // 处理文件上传逻辑
    try {
        Files.copy(file.getInputStream(), Paths.get("uploads/" + file.getOriginalFilename()));
        return ResponseEntity.ok("File uploaded successfully");
    } catch (IOException e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload file");
    }
}
```



### 4 路径参数

虽然路径参数主要用于 GET 请求，但在某些情况下也可以在 POST 请求中使用，例如指定要操作的具体资源 ID。


前端示例（JavaScript）

```javascript
fetch(`/api/users/${userId}`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        "role": "admin"
    })
});
```

后端解析（Spring Boot）

```java
@PostMapping("/api/users/{id}")
public ResponseEntity<User> updateUserRole(@PathVariable Long id, @RequestBody Map<String, Object> requestBody) {
    // 获取并更新用户角色
    String role = (String) requestBody.get("role");
    userRepository.updateUserRole(id, role);
    return ResponseEntity.ok().build();
}
```
