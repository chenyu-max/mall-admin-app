<template>
  <div class="main-header">
    <a-button type="primary" style="margin-bottom: 16px" @click="toggleCollapsed">
      <a-icon :type="$store.state.collapsed ? 'menu-unfold' : 'menu-fold'"/>
    </a-button>
    <div class="breadcrumb">
      <a-breadcrumb>
        <a-breadcrumb-item>{{
            currentRoutes[0] ?
              currentRoutes[0].meta.title : ''
          }}
        </a-breadcrumb-item>
        <a-breadcrumb-item>
          <router-link :to="{name:currentRoutes[1].name}">
            {{ currentRoutes[1] ? currentRoutes[1].meta.title : '' }}
          </router-link>
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <ul class="user-info">
      <li>
        欢迎，{{ $store.state.user.username }}
      </li>
      <li @click="logout">退出</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'sliderNav',
  data() {
    return {
      currentRoutes: this.$router.currentRoute.matched,
    };
  },
  watch: {
    $route() {
      this.currentRoutes = this.$router.currentRoute.matched;
    },
  },
  methods: {
    toggleCollapsed() {
      this.$store.dispatch('changeCollapsed');
    },
    logout() {
      this.$store.dispatch('logout');
      this.$router.replace({
        name: 'Login',
      });
    },
  },
};
</script>

<style scoped lang="less">
.user-info {
  position: absolute;
  right: 0;
  top: 0;

  li {
    padding: 0 20px;
    font-weight: 700;
    float: left;
  }
}
</style>
