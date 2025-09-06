import Home from '../pages/Home';
import About from '../pages/About';
import Login from '../pages/Login';
import Category from '../pages/Category';
import ParamsAndQuery from '../pages/ParamsAndQuery';
import NotFound from '../pages/NotFound';

import HomeRecommend from '../pages/Home/HomeRecommend';
import HomeRanking from '../pages/Home/HomeRanking';

import TransferPage from '../pages/ParamsAndQuery/TransferPage';
import DynamicRoute from '../pages/ParamsAndQuery/DynamicRoute';

// import QueryRoute from '../pages/ParamsAndQuery/QueryRoute';

import { Navigate } from 'react-router-dom'
import React from 'react'

//！ React.lazy实现懒加载，需要传入一个函数，函数的返回值是promise，import即会返回promise
// ！   有懒加载，打包才会进行分包    打包会多一个js文件，由QueryRoute里打包而来    webpack的特性
const QueryRoute = React.lazy(() => import("../pages/ParamsAndQuery/QueryRoute"))

const routes = [
  {
    path: "/",
    element: <Navigate to="/home" />
  },
  {
    path: "/home",
    element: <Home />,
    children: [
      {
        path: "/home",
        element: <Navigate to="/home/ranking" />
      },
      {
        path: "/home/ranking",
        element: <HomeRanking />
      },
      {
        path: "/home/recommend",
        element: <HomeRecommend />
      },
    ]
  },
  {
    path: "/about",
    element: <About />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/category",
    element: <Category />
  },
  {
    path: "/paramsAndQuery",
    element: <ParamsAndQuery />,
    children: [
      {
        path: "/paramsAndQuery",
        element: <Navigate to="/paramsAndQuery/transferPage" />
      },
      {
        path: "/paramsAndQuery/transferPage",
        element: <TransferPage />
      },
      {
        path: "/paramsAndQuery/dynamicRoute/:id",
        element: <DynamicRoute />
      },
      {
        path: "/paramsAndQuery/queryRoute",
        element: <QueryRoute />
      },
    ]
  },
  {
    path: "*",
    element: <NotFound />
  }
]

export default routes