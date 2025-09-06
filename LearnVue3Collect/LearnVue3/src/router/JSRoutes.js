export default [
  {
    path: '/bom',
    component: () => import('@/views/JSAPI/BOM'),
    redirect: '/bom/window',
    name: 'BOM',
    children: [
      {
        path: '/bom/window',
        component: () => import('@/views/JSAPI/BOM/Window'),
        name: 'Window'
      },
      {
        path: '/bom/location',
        component: () => import('@/views/JSAPI/BOM/Location'),
        name: 'Location'
      },
      {
        path: '/bom/history',
        component: () => import('@/views/JSAPI/BOM/History'),
        name: 'History'
      },
      {
        path: '/bom/navigator',
        component: () => import('@/views/JSAPI/BOM/Navigator'),
        name: 'Navigator'
      },
      {
        path: '/bom/screen',
        component: () => import('@/views/JSAPI/BOM/Screen'),
        name: 'Screen'
      },
      
    ]
  },
]
