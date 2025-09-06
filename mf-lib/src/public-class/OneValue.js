// 获取一个值
import {EventEmitter} from 'events'

const privateKey = {
  value: Symbol('value'),
  expiredTime: Symbol('expiredTime'),
  loading: Symbol('loading')
}

export default class OneValue extends EventEmitter {
  [privateKey.value] = null;
  [privateKey.expiredTime] = null;
  [privateKey.loading] = false

  constructor(prop) {
    super(prop)
  }

  // 获取 - 唯一值
  get() {
    return new Promise((resolve, reject) => {
      if (this.hasOldValue()) return resolve(this[privateKey.value])

      if (this[privateKey.loading]) return this.once('waitNewValue', (isError) => {
        if (isError) return reject(null)
        resolve(this[privateKey.value])
      })

      this[privateKey.loading] = true
      this.getNewValue().then((value) => {
        this[privateKey.value] = value
        this.emit('waitNewValue', false)
        resolve(this[privateKey.value])
        this[privateKey.loading] = false
      }).catch(() => {
        this.emit('waitNewValue', true)
        reject(null)
        this[privateKey.loading] = false
      })
    })
  }

  // 判断 - 有旧的值可以用
  hasOldValue() {
    return this[privateKey.value] && this[privateKey.expiredTime] > Date.now()
  }

  setExpiredTime(time) {
    if (time) {
      this[privateKey.expiredTime] = time
    } else {
      this[privateKey.expiredTime] = Date.now() + 60 * 1000
    }
  }

  async getNewValue() {
    this.setExpiredTime()

    return Date.now()
  }
}
