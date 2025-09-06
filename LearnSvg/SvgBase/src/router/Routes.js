export default [
  {
    path: '',
    component: () => import('@/views/Index'),
    redirect: '/basic',
    name: 'Index'
  },
  {
    path: '/basic',
    component: () => import('@/views/basic'),
    redirect: '/basic/graphics',
    name: 'Basic',
    children: [
      {
        path: '/basic/graphics',
        component: () => import('@/views/basic/graphics'),
        name: 'Graphics'
      },
      {
        path: '/basic/displayAttributes',
        component: () => import('@/views/basic/displayAttributes'),
        name: 'DisplayAttributes'
      }
    ]
  },
]
