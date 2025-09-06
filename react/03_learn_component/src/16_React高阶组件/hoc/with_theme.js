import ThemeContext from "../context/theme_context"

function withTheme(OriginComponent) {
  return (props) => {
    console.log('11111111111111111111111111111111111111111111111111111111', props)
    return (
      <ThemeContext.Consumer>
        {
          value => {
            return <OriginComponent {...value} {...props}/>
          }
        }
      </ThemeContext.Consumer>
    )
  }
}

export default withTheme
