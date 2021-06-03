export default {
  icon: 'icon-yewubanli',
  path: '/bus/vip',
  name: 'vip',
  meta: {
    permission: '',
    title: '会员管理'
  },
  children: [
    {
      path: '/bus/vip/search',
      name: 'vip-search',
      meta: {
        permission: '',
        title: '会员查询',
        component: () => import(/* webpackChunkName: "vip-search" */ '@/views/pages/a_vip/vip')
      }
    }, {
      path: '/bus/vip/car',
      name: 'vip-car',
      meta: {
        permission: '',
        title: '车辆管理',
        component: () => import(/* webpackChunkName: "vip-car" */ '@/views/pages/a_vip/car')
      }
    }, {
      path: '/bus/vip/points',
      name: 'vip-points',
      meta: {
        permission: '',
        title: '网点管理',
        component: () => import(/* webpackChunkName: "vip-points" */ '@/views/pages/a_vip/vip')
      }
    }, {
      path: '/bus/vip/carDetail',
      name: 'vip-carDetail',
      hidden: true,
      meta: {
        permission: '',
        title: '车辆详情',
        component: () => import(/* webpackChunkName: "vip-carDetail" */ '@/views/pages/a_vip/carDetail')
      }
    }
  ]
}
