import {GetFirstName} from './FirstName'

export default class Session {
  constructor(name) {
    this.name = () => `${GetFirstName()}-${name}`
  }

  get() {
    let data = sessionStorage.getItem(this.name())
    try {
      data = JSON.parse(data)
    } catch (e) {
    }
    return data
  }

  set(value) {
    let data
    try {
      data = JSON.stringify(value)
    } catch (e) {
      data = value
    }
    sessionStorage.setItem(this.name(), data)
  }

  del() {
    sessionStorage.removeItem(this.name())
  }
}