import React, { memo, useEffect, useState } from 'react'

const App = memo(() => {
  const [count, setCount] = useState(100)

  useEffect(() => {
    console.log("useEffect")
    if (count === 0) {
      setCount(Math.random() + 99)
    }
  }, [count])

  console.log("App render")

  return (
    <div>
      <h2>count: {count}</h2>
      <button onClick={e => setCount(0)}>设置为0</button>
    </div>
  )
})

export default App
