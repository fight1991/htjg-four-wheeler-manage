export default {
  icon: 'icon-power',
  path: '/bus/dashBoard',
  name: 'bus-dashBoard',
  // hidden: true,
  meta: {
    permission: [1, 2, 3, 255],
    title: '首页',
    component: () => import(/* webpackChunkName: "bus-dashBoard" */ '@/views/pages/listDemo')
  }
}