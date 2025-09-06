import React, { PureComponent } from 'react'
import classNames from 'classnames'

export class App extends PureComponent {
  constructor() {
    super()

    this.state = {
      isbbb: true,
      isccc: true
    }
  }

  render() {
    const { isbbb, isccc } = this.state

    const classList = ["aaa"]
    if (isbbb) classList.push("bbb")
    if (isccc) classList.push("ccc")
    const classname = classList.join(" ")

    return (
      <div>
        <h2 className={`aaa ${isbbb ? 'bbb': ''} ${isccc ? 'ccc': ''}`}>哈哈哈</h2>
        <h2 className={classname}>呵呵呵</h2>

        <h2 className={classNames("aaa", { bbb:isbbb, ccc:isccc })}>嘿嘿嘿</h2>
        <h2 className={classNames(["aaa", { bbb: isbbb, ccc: isccc }])}>嘻嘻嘻</h2>

        {/* 
        classNames('foo', 'bar')  => 'foo bar'
        classNames('foo', { bar: true })  => 'foo bar'
        classNames({ 'foo-bar': true })  => 'foo-bar'
        classNames({ 'foo-bar': false })  => ''
        classNames({ foo: true }, { bar: true })  => 'foo bar'
        classNames({ foo: true, bar: true })  => 'foo bar'
        classNames('foo', { bar: true, duck: false }, 'baz', { quux: true})  => 'foo bar baz quux'
        classNames(null, false, 'bar', undefined, 0, 1, { baz: null }, '')  => 'bar 1'
        */}
      </div>
    )
  }
}

export default App