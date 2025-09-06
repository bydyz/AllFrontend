import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'

// 通过react提供的 useNavigate 这个hooks 进行路由跳转
// 通过react提供的 useParams 这个hooks 拿传递过来的参数

export default function withRouter(WrapperComponent) {
  return function(props) {
    // 路由跳转的hooks
    const navigate = useNavigate()

    // 获取动态路由的传参
    const dynamicParam = useParams()

    // 获取当前的地址信息
    // const currentLocation = useLocation()
    // console.log(currentLocation)

    // 获取searchParams
    // const [ searchParams, setSearchParams ] = useSearchParams()
    const [ searchParams ] = useSearchParams()
    // console.log(searchParams.get("name"))                   // 实现了URLSearchParams的对象，可遍历，遍历时实际上是遍历 searchParams.entries()
    const query = Object.fromEntries(searchParams)          // Object.fromEntries()  可以将 实现了URLSearchParams的对象 转换为普通的对象


    const router = { navigate, dynamicParam, query }

    return <WrapperComponent { ...props } router={router} />
  }
}