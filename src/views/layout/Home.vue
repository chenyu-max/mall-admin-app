<template>
  <div class="home">
    <left-menu :key="key"></left-menu>
    <div :class="{'main-app':true, 'menu-unfold': $store.state.collapsed}">
      <slider-nav></slider-nav>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import LeftMenu from './components/leftMenu.vue';
import SliderNav from './components/sliderNav.vue';

export default {
  data() {
    return {
      key: new Date().getTime(),
    };
  },
  created() {
    // 如果用户的身份不是管理员，那么无法进行类目管理操作
    if (this.$store.state.user.role !== 'admin') {
      this.$router.options.routes.forEach((item) => {
        if (item.name === 'Product') {
          item.children.forEach((child) => {
            const obj = child;
            if (obj.name === 'Category') {
              obj.meta.hidden = true;
            }
          });
        }
      });
    }
  },
  watch: {
    $route() {
      this.key = new Date().getTime();
    },
  },
  components: {
    LeftMenu,
    SliderNav,
  },
};
</script>

<style lang="less">
@import "~@/assets/css/home.less";

</style>
