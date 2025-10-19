// 没有 as const
const config = {
  url: "https://api.example.com",
  method: "GET",
  timeout: 5000,
  retry: true
};
// 类型: { url: string; method: string; timeout: number; retry: boolean; }

// 使用 as const
const config2 = {
  url: "https://api.example.com",
  method: "GET",
  timeout: 5000,
  retry: true
} as const;
// 类型: { readonly url: "https://api.example.com"; readonly method: "GET"; readonly timeout: 5000; readonly retry: true; }