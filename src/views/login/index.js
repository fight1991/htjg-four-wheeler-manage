export default [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ './signIn'),
    meta: {
      title: '登录',
      requiresAuth: false
    }
  }
]
