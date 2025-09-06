export default [
  {
    path: '',
    component: () => import('@/views/Index'),
    redirect: '/data',
    name: 'Index'
  },
  
  {
    path: '/data',
    component: () => import('@/views/Vue3API/Data'),
    redirect: '/data/learnReactiveRef',
    name: 'Data',
    children: [
      {
        path: '/data/learnReactiveRef',
        component: () => import('@/views/Vue3API/Data/LearnReactiveRef'),
        name: 'LearnReactiveRef'
      },
      {
        path: '/data/exampleReactiveRef',
        component: () => import('@/views/Vue3API/Data/ExampleReactiveRef'),
        name: 'ExampleReactiveRef'
      },
      {
        path: '/data/refDom',
        component: () => import('@/views/Vue3API/Data/RefDom'),
        name: 'RefDom'
      },
      {
        path: '/data/apiCollect',
        component: () => import('@/views/Vue3API/Data/ApiCollect'),
        redirect: '/data/apiCollect/readonly',
        name: 'ApiCollect',
        children: [
          {
            path: '/data/apiCollect/readonly',
            component: () => import('@/views/Vue3API/Data/ApiCollect/Readonly'),
            name: 'Readonly'
          },
          {
            path: '/data/apiCollect/toRefs',
            component: () => import('@/views/Vue3API/Data/ApiCollect/ToRefs'),
            name: 'ToRefs'
          }
        ]
      }
    ]
  },
  {
    path: '/provideInject',
    component: () => import('@/views/Vue3API/ProvideInject'),
    name: 'ProvideInject'
  },
  {
    path: '/computed',
    component: () => import('@/views/Vue3API/Computed'),
    name: 'Computed'
  },
  {
    path: '/lifeCircle',
    component: () => import('@/views/Vue3API/LifeCircle'),
    name: 'LifeCircle'
  },
  {
    path: '/watch',
    component: () => import('@/views/Vue3API/Watch'),
    redirect: '/watch/learnWatch',
    name: 'Watch',
    children: [
      {
        path: '/watch/learnWatch',
        component: () => import('@/views/Vue3API/Watch/LearnWatch'),
        name: 'LearnWatch'
      },
      {
        path: '/watch/learnWatchEffect',
        component: () => import('@/views/Vue3API/Watch/LearnWatchEffect'),
        name: 'learnWatchEffect'
      }
    ]
  },
  {
    path: '/props',
    component: () => import('@/views/Vue3API/Props'),
    name: 'Props'
  },
  {
    path: '/emits',
    component: () => import('@/views/Vue3API/Emits'),
    name: 'Emits'
  },
  {
    path: '/pinia',
    component: () => import('@/views/Vue3API/Pinia'),
    redirect: '/pinia/1Basic',
    name: 'Pinia',
    children: [
      {
        path: '/pinia/1Basic',
        component: () => import('@/views/Vue3API/Pinia/1Basic'),
        name: '1Basic'
      },
      {
        path: '/pinia/2State',
        component: () => import('@/views/Vue3API/Pinia/2State'),
        name: '2State'
      },
      {
        path: '/pinia/3Getters',
        component: () => import('@/views/Vue3API/Pinia/3Getters'),
        name: '3Getters'
      },
      {
        path: '/pinia/4Actions',
        component: () => import('@/views/Vue3API/Pinia/4Actions'),
        name: '4Actions'
      },
    ]
  },
  {
    path: '/useSlot',
    component: () => import('@/views/Vue3API/UseSlot'),
    redirect: '/useSlot/defaultSlot',
    name: 'UseSlot',
    children: [
      {
        path: '/useSlot/defaultSlot',
        component: () => import('@/views/Vue3API/UseSlot/DefaultSlot'),
        name: 'DefaultSlot'
      },
      {
        path: '/useSlot/namedSlot',
        component: () => import('@/views/Vue3API/UseSlot/NamedSlot'),
        name: 'NamedSlot'
      },
      {
        path: '/useSlot/scopeSlot',
        component: () => import('@/views/Vue3API/UseSlot/ScopeSlot'),
        name: 'ScopeSlot'
      },
    ]
  },
]
