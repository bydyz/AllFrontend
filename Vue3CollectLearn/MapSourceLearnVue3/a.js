import { ref } from 'vue';

const __sfc__ = {
  __name: 'App',
  setup(__props, { expose: __expose }) {
    __expose();

    const msg = ref('Hello World!');

    const __returned__ = { msg, ref };
    Object.defineProperty(__returned__, '__isScriptSetup', {
      enumerable: false,
      value: true,
    });
    return __returned__;
  },
};
import {
  toDisplayString as _toDisplayString,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
} from 'vue';
function render(
  _ctx,
  _cache,
  $props,
  $setup,
  $data,
  $options
) {
  return (
    _openBlock(),
    _createElementBlock(
      'h1',
      null,
      _toDisplayString($setup.msg),
      1 /* TEXT */
    )
  );
}
__sfc__.render = render;
__sfc__.__file = 'src/App.vue';
export default __sfc__;
