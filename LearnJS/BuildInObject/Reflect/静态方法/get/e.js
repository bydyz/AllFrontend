const user = {
  name: 'Alice',
  email: 'alice@example.com',
  age: 30
};

const loggedUser = new Proxy(user, {
  get(target, property, receiver) {
    console.log(`[GET] ${property} accessed at ${new Date().toISOString()}`);
    const value = Reflect.get(target, property, receiver);
    console.log(`[GET] ${property} = ${value}`);
    return value;
  }
});

// 使用
loggedUser.name;
// 输出:
// [GET] name accessed at 2024-01-01T10:00:00.000Z
// [GET] name = Alice