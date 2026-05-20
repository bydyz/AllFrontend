import {EventEmitter} from 'events'

export default class EventBus {
  constructor() {
    this.$emitter = new EventEmitter()
  }

  $once(eventName, func) {
    this.$emitter.once(eventName, func)
    return this
  }

  $emit(eventName, data) {
    this.$emitter.emit(eventName, data)
    return this
  }

  $on(eventName, func) {
    this.$emitter.on(eventName, func)
    return this
  }

  $off(eventName, func) {
    this.$emitter.off(eventName, func)
    return this
  }
}