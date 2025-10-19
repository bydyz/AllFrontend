// API 配置
const API_CONFIG = {
  baseURL: "https://api.example.com",
  endpoints: {
    users: "/users",
    posts: "/posts",
    comments: "/comments"
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  defaultHeaders: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  }
} as const;

//！ 似乎有没有 methods 后的 as const 都一样
// 类型推断结果：
// {
//   readonly baseURL: "https://api.example.com";
//   readonly endpoints: {
//     readonly users: "/users";
//     readonly posts: "/posts";
//     readonly comments: "/comments";
//   };
//   readonly methods: readonly ["GET", "POST", "PUT", "DELETE"];
//   readonly defaultHeaders: {
//     readonly "Content-Type": "application/json";
//     readonly "Accept": "application/json";
//   };
// }

// 使用示例
type Endpoint = keyof typeof API_CONFIG.endpoints;  // "users" | "posts" | "comments"
type Method = typeof API_CONFIG.methods[number];    // "GET" | "POST" | "PUT" | "DELETE"

type Method1 = typeof API_CONFIG.methods[0];    // "GET"

export {}