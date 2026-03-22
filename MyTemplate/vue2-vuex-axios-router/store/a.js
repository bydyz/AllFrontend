const { Project } = require("@/api");

const state = {
  countWait: {
    todoAuditStat: null,
    todoCarryonStat: null,
    todoPushStat: null
  }
}
const getters = {
  countWaitTotal1: (state) => {
    let n = 0
    for (const k in state.countWait) {
      n += Number(state.countWait[k])
    }
    return n || 0
  },
  // getters  返回一个函数
  countWaitTotal2: (state) => (JdCode) => {
    if(JdCode === 'isJD') return Number(state.countWait["todoCarryonStat"])
    if(JdCode === 'isQZSJ') return Number(state.countWait["todoAuditStat"]) + Number(state.countWait["todoPushStat"])
    let n = 0
    for (const k in state.countWait) {
        n += Number(state.countWait[k])
    }
    return n || 0
  },
  countWait: (state) => state.countWait
}

const mutations = {
  updateCountWait (state, d) {
    state.countWait = d
  }
}
const actions = {
  async getCountWait (ctx) {
    let { data } = await Project.countWait()
    ctx.commit('updateCountWait', data)
  }
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
