<template>
  <div class="menu-list">
    <a-menu
      :default-selected-keys="[$router.currentRoute.matched[1] ?
      $router.currentRoute.matched[1].name : '']"
      :default-open-keys="[$router.currentRoute.matched[0].name]"
      mode="inline"
      theme="dark"
      :inline-collapsed="$store.state.collapsed"
    >
      <template v-for="route in $store.state.menuRoutes">
        <a-sub-menu :key="route.name" v-if="!route.meta.hidden">
          <span slot="title">
            <a-icon :type='route.meta.icon'/>
            <span>{{ route.meta.title }}</span>
          </span>
          <template v-for="childRoute in route.children">
            <a-menu-item :key="childRoute.name" v-if="!childRoute.meta.hidden">
              <router-link :to="{name : childRoute.name}">
                <a-icon :type='childRoute.meta.icon'/>
                {{ childRoute.meta.title }}
              </router-link>
            </a-menu-item>
          </template>
        </a-sub-menu>
      </template>
    </a-menu>
  </div>
</template>

<script>
export default {
  name: 'leftMenu',
  watch: {
    $route(val) {
      this.router = val;
    },
  },
};
</script>

<style scoped>

</style>
