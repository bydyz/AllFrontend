import ThemeContext from "./context/theme-context"

function HomeBanner() {

  return <div>
    {/* 函数式组件中使用Context共享的数据 */}
    <ThemeContext.Consumer>
      {
        value => {
          return (
            <div>
              <h2> Banner theme:{value.color}</h2>
              <h2> Banner theme:{value.size}</h2>
            </div>
            
          )
        }
      }
    </ThemeContext.Consumer>
  </div>
}

export default HomeBanner
