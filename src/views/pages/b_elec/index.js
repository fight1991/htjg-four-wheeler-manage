export default {
  icon: 'icon-yewubanli',
  path: '/bus/elec',
  name: 'elec',
  meta: {
    permission: '',
    title: '电子车牌'
  },
  children: [
    {
      path: '/bus/elec/accept',
      name: 'elec-accept',
      meta: {
        permission: '',
        title: '网点领卡管理',
        component: () => import(/* webpackChunkName: "elec-accept" */ '@/views/pages/a_vip/vip')
      }
    }
  ]
}
