// 在支持 Object.hasOwn 的浏览器中，建议使用 Object.hasOwn()，而非 hasOwnProperty()。

function validateUser(user) {
  const requiredProperties = ['username', 'email', 'password'];
  
  for (const prop of requiredProperties) {
    if (!user.hasOwnProperty(prop)) {
      throw new Error(`Missing required property: ${prop}`);
    }
  }
  
  return true;
}

const validUser = { username: 'john', email: 'john@example.com', password: 'secret' };
const invalidUser = { username: 'john', email: 'john@example.com' };

console.log(validateUser(validUser));   // true
console.log(validateUser(invalidUser)); // Error: Missing required property: password