import {GetFirstName} from './FirstName'

export default class Local {
  constructor(name) {
    this.name = () => `${GetFirstName()}-${name}`
  }

  get() {
    let data = localStorage.getItem(this.name())
    try {
      data = JSON.parse(data)
    } catch (e) {
    }
    return data
  }

  set(value) {
    try {
      localStorage.setItem(this.name(), JSON.stringify(value))
    } catch (e) {
      if (value === null) return this.del()
      if (typeof value === 'object') return false
      localStorage.setItem(this.name(), value)
    }
  }

  del() {
    localStorage.removeItem(this.name())
  }
}