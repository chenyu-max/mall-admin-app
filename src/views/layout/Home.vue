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
