export * from './public-class'
export * from './public-func'

import * as a from './public-class'
import * as b from './public-func'

export default {
  ...a,
  ...b
}