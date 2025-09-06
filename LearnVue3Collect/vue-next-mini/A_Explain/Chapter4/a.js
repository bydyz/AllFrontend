const p1 = {
  lastName: '三',
  firstName: '张',
  get fullName() {
    return this.firstName + this.lastName
  }
}

const proxy = new Proxy(p1, {
  get(target, key, receiver) {
    console.log(target, key, receiver)
    return target[key]
  }
})

console.log(proxy.fullName)
