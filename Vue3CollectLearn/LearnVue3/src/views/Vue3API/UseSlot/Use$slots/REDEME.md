# $slots的类型

```typescript
interface ComponentPublicInstance {
  $slots: { [name: string]: Slot }    // 索引签名
}

type Slot = (...args: any[]) => VNode[]
```

讲解文件名：`16_TS对象类型索引签名-基本使用.ts`