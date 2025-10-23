export default [
  {
    path: '/example/1',
    component: () => import('@/views/Example/1'),
    name: 'Example1'
  },
  {
    path: '/example/2',
    component: () => import('@/views/Example/2'),
    name: 'Example2'
  },
]
