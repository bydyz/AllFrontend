let _supportsPassive = false

export function supportsPassive() {
  return _supportsPassive
}

console.log("rcrcrcrcrc utils方法的打印")

if (typeof window !== 'undefined') {
  _supportsPassive = false
  try {
    const opts = Object.defineProperty({}, 'passive', {
      get() {
        _supportsPassive = true
      },
    })
    window.addEventListener('test', null, opts)
  }
  // eslint-disable-next-line unused-imports/no-unused-vars
  catch (e) {
    // noop
  }
}
