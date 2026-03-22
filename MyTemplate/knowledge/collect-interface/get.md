在构建 RESTful API 时，GET 请求通常用于从服务器获取数据，而不应该用于修改或创建资源。

@ModelAttribute
@RequestParam
@PathVariable
@RequestBody
@RequestHeader

### 1 查询参数（Query Parameters）

这是最常用的 GET 请求传参方式，适用于传递键值对形式的数据。查询参数附加在 URL 的末尾，以 ? 开始，多个参数之间用 & 分隔。


前端示例（HTML + JavaScript）

```Html
<!-- HTML -->
<a href="/api/users?name=John&page=1">Get Users</a>

<!-- 或者使用 JavaScript 发送请求 -->
<script>
fetch('/api/users?name=John&page=1')
    .then(response => response.json())
    .then(data => console.log(data));
</script>
```


后端解析（Spring Boot）

```java
@GetMapping("/api/users")
public ResponseEntity<List<User>> getUsers(
    @RequestParam(value = "name", required = false) String name,
    @RequestParam(value = "page", defaultValue = "1") int page) {
    // 根据参数查询用户列表
    List<User> users = userService.findUsersByName(name, page);
    return ResponseEntity.ok(users);
}
```



### 2 路径参数（Path Parameters）

路径参数是将参数嵌入到 URL 的路径中，适合用于指定具体资源的标识符，如 ID。


前端示例（JavaScript）

```javascript
fetch(`/api/users/${userId}`)
    .then(response => response.json())
    .then(data => console.log(data));
```


后端解析（Spring Boot）

```java
@GetMapping("/api/users/{id}")
public ResponseEntity<User> getUserById(@PathVariable Long id) {
    // 根据 ID 获取用户信息
    User user = userService.findById(id);
    if (user == null) {
        return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok(user);
}
```



### 3 组合使用

实际应用中，GET 请求的参数可以组合使用查询参数和路径参数，甚至包括请求头中的参数，以满足复杂的业务需求。


前端示例（JavaScript）

```javascript
fetch(`/api/users/${userId}?status=active`, {
    headers: {
        'Authorization': 'Bearer your_token_here'
    }
})
    .then(response => response.json())
    .then(data => console.log(data));
```


后端解析（Spring Boot）

```java
@GetMapping("/api/users/{id}")
public ResponseEntity<User> getUserByIdAndStatus(
    @PathVariable Long id,
    @RequestParam(value = "status", required = false) String status,
    @RequestHeader("Authorization") String authorization) {
    // 根据 ID 和状态获取用户信息，并验证授权信息
    User user = userService.findByIdAndStatus(id, status);
    if (user == null) {
        return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok(user);
}
```



### 4 使用对象封装查询参数

当查询参数较多且结构化时，可以考虑将这些参数封装成一个对象，使代码更加简洁和易读。


前端示例（JavaScript）

```javascript
const params = new URLSearchParams({
    'name': 'John',
    'age': '30',
    'city': 'New York'
});

fetch(`/api/users?${params.toString()}`)
    .then(response => response.json())
    .then(data => console.log(data));
```


后端解析（Spring Boot）

```java
public class UserQueryParams {
    private String name;
    private Integer age;
    private String city;

    // Getters and Setters
}

@GetMapping("/api/users")
public ResponseEntity<List<User>> getUsers(@ModelAttribute UserQueryParams queryParams) {
    // 根据封装的对象查询用户列表
    List<User> users = userService.findUsersByCriteria(queryParams);
    return ResponseEntity.ok(users);
}
```
