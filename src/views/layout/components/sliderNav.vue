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
        <ul>
          <li @click="changeShow">
            欢迎，{{ $store.state.user.username }}
            <a-icon :type="isShow ? 'up' : 'down' "></a-icon>
          </li>
          <li :class="{show:isShow === true, hidden : isShow === false}">
            <DialogBox :name="'changePassword'"></DialogBox>
          </li>
          <li :class="{show:isShow === true, hidden : isShow === false}">
            <DialogBox :name="'changeUserInfo'"></DialogBox>
          </li>
        </ul>
      </li>
      <li @click="logout">退出</li>
    </ul>
  </div>
</template>

<script>
import DialogBox from '@/components/DialogBox/index.vue';

export default {
  name: 'sliderNav',
  components: {
    DialogBox,
  },
  data() {
    return {
      currentRoutes: this.$router.currentRoute.matched,
      isShow: false,
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
    changeShow() {
      this.isShow = !this.isShow;
    },
  },
};
</script>

<style scoped lang="less">
.user-info {
  position: absolute;
  right: 0;
  top: 0;
  z-index: 100;

  > li {
    padding: 0 20px;
    font-weight: 700;
    float: left;

    ul {
      li {
        width: 150px;
        height: 50px;
        line-height: 50px;
        text-align: center;
      }

      .show {
        display: block;
        background-color: #fff;

        &:hover {
          background-color: #30A6C6;
        }
      }

      .hidden {
        display: none;
      }
    }
  }
}
</style>
