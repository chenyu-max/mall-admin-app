<template>
  <div class="container">
    <a-button type="primary" @click="showModal">
      {{ name === 'changePassword' ? '修改密码' : '修改用户信息' }}
    </a-button>
    <a-modal
      title="修改密码"
      :visible="visible"
      :confirm-loading="confirmLoading"
      :mask="true"
      :maskClosable="true"
      :destroyOnClose="true"
      :centered="true"
      footer=""
      @cancel="handleCancel"
    >
      <changePassword v-if="name === 'changePassword'" @over="handleOk"></changePassword>
      <changeUserInfo v-else @over="handleOk"></changeUserInfo>
    </a-modal>
  </div>
</template>

<script>
import changePassword from './components/changePassword.vue';
import changeUserInfo from './components/changeUserInfo.vue';

export default {
  name: 'index.vue',
  components: {
    changePassword,
    changeUserInfo,
  },
  props: ['name'],
  data() {
    return {
      visible: false,
      confirmLoading: false,
    };
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    handleOk() {
      this.confirmLoading = true;
      setTimeout(() => {
        this.visible = false;
        this.confirmLoading = false;
      }, 500);
    },
    handleCancel() {
      this.visible = false;
    },
  },
};
</script>
