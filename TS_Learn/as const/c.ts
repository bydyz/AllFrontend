// Redux Action 常量
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

// 类型安全的 Action Creator
function createAction<T extends string, P>(type: T, payload: P) {
  return { type, payload } as const;
}

const loginAction = createAction(ACTION_TYPES.USER.LOGIN, { userId: "123" });
// 类型: { readonly type: "USER/LOGIN"; readonly payload: { userId: string; } }

// 联合所有 Action 类型
type UserActionType = typeof ACTION_TYPES.USER[keyof typeof ACTION_TYPES.USER];     // "USER/LOGIN" | "USER/LOGOUT" | "USER/UPDATE"
type PostActionType = typeof ACTION_TYPES.POST[keyof typeof ACTION_TYPES.POST];     // "POST/CREATE" | "POST/UPDATE" | "POST/DELETE"
type AllActionTypes = UserActionType | PostActionType;                              // 