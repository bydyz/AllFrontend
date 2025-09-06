import React, { PureComponent } from 'react'

import "./style.css"

// ◼ 在Router6.x版本之后，代码类的API都迁移到了hooks的写法：
//    如果我们希望进行代码跳转，需要通过useNavigate的Hook获取到navigate对象进行操作；
//    那么如果是一个函数式组件，我们可以直接调用，但是如果是一个类组件呢？    使用高阶组件进行增强



import { Routes, Route, Link, Navigate } from 'react-router-dom'

import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Category from './pages/Category';
import ParamsAndQuery from './pages/ParamsAndQuery';
import NotFound from './pages/NotFound';

import HomeRecommend from './pages/Home/HomeRecommend';
import HomeRanking from './pages/Home/HomeRanking';

import TransferPage from './pages/ParamsAndQuery/TransferPage';
import DynamicRoute from './pages/ParamsAndQuery/DynamicRoute';
import QueryRoute from './pages/ParamsAndQuery/QueryRoute';


export class App extends PureComponent {


  render() {
    return (
      <div className="app">
        <div className="header">
          <span>Header</span>

          <div className="nav">
            {/* Link  最终会被渲染成a元素          to属性：Link中最重要的属性，用于设置跳转到的路径； */}
            {/* 除Link外，还有  NavLink  区别是其 激活是默认有 active 这个className， 除此之外，它还有  style、className  允许传入函数，函数的参数是对象， 默认包含 isActive  激活时，其值为true */}
            <Link to="/home">首页</Link>

            <Link to="/about">关于</Link>

            <Link to="/login">登录</Link>

            <Link to="/paramsAndQuery">paramsAndQuery</Link>
          </div>
          <hr />
        </div>


        <div className="content">
          <Routes>
            <Route path='/' element={<Navigate to="/home"/>}></Route>

            <Route path='/home' element={<Home/>}>
              <Route path='/home' element={<Navigate to="/home/ranking"/>}></Route>
              <Route path="/home/recommend" element={<HomeRecommend/>}></Route>
              <Route path="/home/ranking" element={<HomeRanking/>}></Route>
            </Route>

            <Route path='/about' element={<About/>}></Route>

            <Route path='/login' element={<Login/>}/>

            <Route path='/category' element={<Category/>}/>

            <Route path='/paramsAndQuery' element={<ParamsAndQuery/>}>
              <Route path='/paramsAndQuery' element={<Navigate to="/paramsAndQuery/transferPage"/>}></Route>

              <Route path='/paramsAndQuery/transferPage' element={<TransferPage/>}/>

              <Route path='/paramsAndQuery/dynamicRoute/:id' element={<DynamicRoute/>}/>

              <Route path='/paramsAndQuery/queryRoute' element={<QueryRoute/>}/>

            </Route>

            <Route path='*' element={<NotFound/>}/>
          </Routes>
        </div>

        <div className="footer">
          Footer
          <hr />
        </div>
      </div>
    )
  }
}



export default App