// 实时表单验证

function createValidatedForm() {
  const form = {
    values: {},
    errors: {},
    isValid: true
  };

  return new Proxy(form, {
    set(target, property, value, receiver) {
      if (property === 'values') {
        // 当设置 values 时，自动验证
        const validationResult = validateFormValues(value);
        target.errors = validationResult.errors;
        target.isValid = validationResult.isValid;
      }
      
      return Reflect.set(target, property, value, receiver);
    }
  });
}

function validateFormValues(values) {
  const errors = {};
  let isValid = true;

  if (!values.email || !values.email.includes('@')) {
    errors.email = 'Invalid email address';
    isValid = false;
  }
  
  if (!values.password || values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
    isValid = false;
  }

  return { errors, isValid };
}

// 使用示例
const form = createValidatedForm();

form.values = {
  email: 'test@example.com',
  password: '123456'
};
console.log('Form valid:', form.isValid); // true
console.log('Errors:', form.errors);      // {}

form.values = {
  email: 'invalid-email',
  password: '123'
};
console.log('Form valid:', form.isValid); // false
console.log('Errors:', form.errors);      // { email: 'Invalid email address', ... }