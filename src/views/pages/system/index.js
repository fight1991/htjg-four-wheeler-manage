export default {
  icon: 'icon-shezhi',
  path: '/bus/system',
  name: 'bus-system',
  hidden: true,
  meta: {
    permission: [1, 2, 3, 255],
    title: '系统设置',
    component: () => import(/* webpackChunkName: "bus-system" */ '@/views/pages/listDemo')
  }
}
