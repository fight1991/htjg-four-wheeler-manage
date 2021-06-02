<template>
  <div>
    <!-- 只有一级菜单 -->
    <template v-if="firstMenuShow">
      <el-menu-item :index="menuItem.name" v-show="menuPemission()">
        <i v-if="menuItem.icon" :class="'iconfont '+ menuItem.icon"></i>
        <span slot="title" class="sub-title text-cut" :title="menuItem.meta.title">{{menuItem.meta.title}}</span>
      </el-menu-item>
    </template>
    <!-- 有二级菜单 -->
    <template v-else>
      <el-submenu v-show="menuPemission(menuItem)" :index="menuItem.name" popper-class="sidebar-pop">
        <template slot="title">
          <i v-if="menuItem.icon" :class="'iconfont '+ menuItem.icon"></i>
          <span slot="title" class="sub-title text-cut" :title="menuItem.meta.title">{{menuItem.meta.title}}</span>
        </template>

        <template v-for="child in menuItem.children">
          <!-- 递归 -->
          <sidebar-item
            v-if="child.children&&child.children.length>0"
            :menuItem="child"
            :key="child.name"/>
          <!-- 二级菜单 -->
          <template v-else>
            <el-menu-item v-show="menuPemission(child, 'chidl')" :key="child.name" :index="child.name">
              <i v-if="child.icon" :class="'iconfont '+ child.icon"></i>
              <span slot="title" class="sub-title text-cut" :title="child.meta.title">{{child.meta.title}}</span>
            </el-menu-item>
          </template>
        </template>
      </el-submenu>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'sidebarItem',
  data () {
    return {}
  },
  computed: {
    firstMenuShow () {
      return !this.menuItem.children || this.menuItem.children.length === 0
    },
    ...mapState({
      permissions: state => state.permissions
    })
  },
  props: {
    menuItem: {
      type: Object,
      required: true,
      default () {
        return {}
      }
    }
  },
  methods: {
    menuPemission (obj = this.menuItem) {
      let { meta } = obj
      return !meta.permission || (this.permissions.includes(meta.permission))
    }
  }
}
</script>

<style lang="less" scoped>
.iconfont {
  margin-right: 10px;
  font-size: 18px;
}
</style>
