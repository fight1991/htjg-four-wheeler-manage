export default {
  path: '/bus/index',
  hidden: true,
  name: 'tab-index',
  meta: {
    permission: '',
    title: '首页',
    component: () => import(/* webpackChunkName: "home" */ '@/views/pages/home/index.vue')
  }
}
