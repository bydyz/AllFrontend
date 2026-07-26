const parent = {
  _val: 42,
  get value() {
    console.log(this);
    return this._val;
  },
};

const child = Object.create(parent);
child.childValue = 100;

console.log(child.value);
