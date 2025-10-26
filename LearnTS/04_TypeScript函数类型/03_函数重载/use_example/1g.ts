//！   Promise 返回类型重载


interface User {
  id: number;
  name: string;
  email: string;
}

interface Product {
  id: number;
  title: string;
  price: number;
}

// 重载签名
function fetchData(endpoint: 'users'): Promise<User[]>;
function fetchData(endpoint: 'products'): Promise<Product[]>;
function fetchData(endpoint: 'users' | 'products', id: number): Promise<User | Product>;

// 实现签名
async function fetchData(endpoint: any, id?: number): Promise<any> {
  const baseUrl = 'https://api.example.com';
  
  if (id !== undefined) {
    // 获取单个资源
    const response = await fetch(`${baseUrl}/${endpoint}/${id}`);
    return await response.json();
  } else {
    // 获取资源列表
    const response = await fetch(`${baseUrl}/${endpoint}`);
    return await response.json();
  }
}

// 使用
async function example() {
  const users = await fetchData('users');
  // ✅ 类型: Promise<User[]>
  console.log(users[0].name); // 可以访问 User 属性

  const products = await fetchData('products');
  // ✅ 类型: Promise<Product[]>
  console.log(products[0].price); // 可以访问 Product 属性

  const user = await fetchData('users', 1);
  // const user = await fetchData('users', 1) as User;      // 加类型推断才不会有问题了
  // ✅ 类型: Promise<User>
  console.log(user.email); // 可以访问 User 属性

  const product = await fetchData('products', 1);
  // const product = await fetchData('products', 1) as Product;      // 加类型推断才不会有问题了
  // ✅ 类型: Promise<Product>
  console.log(product.title); // 可以访问 Product 属性
}



export {}