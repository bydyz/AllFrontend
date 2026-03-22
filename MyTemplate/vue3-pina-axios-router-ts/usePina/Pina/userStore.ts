import { defineStore } from 'pinia'

// 给state设定属性
interface UserStoreState {
  nickName: string,
  age: number
}

const userStore = defineStore("userStore", {
  state: (): UserStoreState => ({
    nickName: "rc",
    age: 25
  }),
  getters: {
    getNickName(state) {
      return state.nickName
    }
  },
  actions: {
    setNickName(newNickName: string) {
      this.nickName = newNickName
    }
  }
})

export default userStore
