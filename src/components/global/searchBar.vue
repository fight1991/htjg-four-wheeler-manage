<template>
  <transition name="list-complete">
    <div class="search-container">
      <slot></slot>
    </div>
  </transition>
</template>
<script>
export default {
  data () {
    return {

    }
  }
}
</script>
<style lang="less" scoped>
//   .list-complete-enter, .list-complete-leave-to
// /* .list-complete-leave-active for below version 2.1.8 */ {
//   opacity: 0;
//   transform: translateY(30px);
// }
// .list-complete-leave-active {
//   position: absolute;
// }

</style>
