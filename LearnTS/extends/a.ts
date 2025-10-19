// T extends HasLength：类型参数 T 必须扩展或满足 HasLength 接口

const ACTION_TYPES = {
  USER: {
    LOGIN: "USER/LOGIN",
    LOGOUT: "USER/LOGOUT",
    UPDATE: "USER/UPDATE"
  },
  POST: {
    CREATE: "POST/CREATE",
    UPDATE: "POST/UPDATE",
    DELETE: "POST/DELETE"
  }
} as const;


//！ 泛型约束解读
//！    T extends HasLength：类型参数 T 必须扩展或满足 HasLength 接口
//！    这意味着 T 必须包含 length: number 属性
//！    T 可以是任何类型，只要它有 length 属性

//？  此处是设定了2个泛型   一个 T ，其要求为 T extends string；另一个 P ，无要求
function createAction<T extends string, P>(type: T, payload: P) {
  return { type, payload } as const;
}

const loginAction = createAction(ACTION_TYPES.USER.LOGIN, { userId: "123" });

export {}