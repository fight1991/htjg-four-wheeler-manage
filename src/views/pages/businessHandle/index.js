export default {
  icon: 'icon-yewubanli',
  path: '/bus/businessH',
  name: 'bus-businessH',
  // hidden: true,
  meta: {
    permission: '0203000000',
    title: '业务办理'
  },
  children: [
    {
      path: '/bus/businessH/ownerrecord',
      name: 'bus-businessH-ownerrecord',
      meta: {
        permission: '0203010000',
        title: '居民车备案审核',
        pageFlag: 'owner',
        component: () => import(/* webpackChunkName: "bus-businessH-record" */ '@/views/pages/businessHandle/recordList')
      }
    }, {
      path: '/bus/businessH/recordCheck',
      name: 'bus-businessH-recordCheck',
      hidden: true,
      meta: {
        permission: '',
        title: '备案审核详情',
        component: () => import(/* webpackChunkName: "bus-businessH-recordCheck" */ '@/views/pages/businessHandle/recordCheck')
      }
    }, {
      path: '/bus/businessH/ownerchange',
      name: 'bus-businessH-ownerchange',
      meta: {
        permission: '0203020000',
        title: '居民车备案人变更',
        component: () => import(/* webpackChunkName: "bus-businessH-change" */ '@/views/pages/businessHandle/changeList')
      }
    }, {
      path: '/bus/businessH/changeCheck',
      name: 'bus-businessH-changeCheck',
      hidden: true,
      meta: {
        permission: '',
        title: '备案人变更审核',
        component: () => import(/* webpackChunkName: "bus-businessH-changeCheck" */ '@/views/pages/businessHandle/changeCheck')
      }
    }, {
      path: '/bus/businessH/ownerscrap',
      name: 'bus-businessH-ownerscrap',
      meta: {
        permission: '0203030000',
        title: '居民车报废审核',
        pageFlag: 'owner',
        component: () => import(/* webpackChunkName: "bus-businessH-scrap" */ '@/views/pages/businessHandle/scrapList')
      }
    }, {
      path: '/bus/businessH/scrapCheck',
      name: 'bus-businessH-scrapCheck',
      hidden: true,
      meta: {
        permission: '',
        title: '报废审核详情',
        component: () => import(/* webpackChunkName: "bus-businessH-scrapCheck" */ '@/views/pages/businessHandle/scrapCheck')
      }
    }, {
      path: '/bus/businessH/industryrecord',
      name: 'bus-businessH-industryrecord',
      meta: {
        permission: '0203040000',
        title: '行业车备案审核',
        pageFlag: 'industry',
        component: () => import(/* webpackChunkName: "bus-businessH-record" */ '@/views/pages/businessHandle/recordList')
      }
    }, {
      path: '/bus/businessH/industryscrap',
      name: 'bus-businessH-industryscrap',
      meta: {
        permission: '0203050000',
        title: '行业车报废审核',
        pageFlag: 'industry',
        component: () => import(/* webpackChunkName: "bus-businessH-scrap" */ '@/views/pages/businessHandle/scrapList')
      }
    }
  ]
}
