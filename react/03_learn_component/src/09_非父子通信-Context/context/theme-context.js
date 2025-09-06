import React from "react"

// 1.创建一个Context
const ThemeContext = React.createContext({ type: "ThemeContext", color: "blue", size: 10 })

export default ThemeContext
