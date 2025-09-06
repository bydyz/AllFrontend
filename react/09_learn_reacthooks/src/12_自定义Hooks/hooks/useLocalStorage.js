import { useEffect } from "react"
import { useState } from "react"

function useLocalStorage(key) {
  // 1.从localStorage中获取数据, 并且数据数据创建组件的state
  const [data, setData] = useState(() => {

    // localStorage.getItem(key) 返回存储在 localStorage 中的指定键（key）的值。如果键不存在，则返回 null
    const item = localStorage.getItem(key)
    if (!item) return ""
    // return JSON.parse(item)
    return item
  })

  // 2.监听data改变, 一旦发生改变就存储data最新值
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(data))
  }, [data])

  // 3.将data/setData的操作返回给组件, 让组件可以使用和修改值
  return [data, setData]
}


export default useLocalStorage
