<template>
  <div class="container">
    <a-button @click="showModal">
      {{ '修改类目' }}
    </a-button>
    <a-modal
      title="修改类目"
      :visible="visible"
      :confirm-loading="confirmLoading"
      :mask="true"
      :maskClosable="true"
      :destroyOnClose="true"
      :centered="true"
      footer=""
      @cancel="handleCancel"
    >
      <editCategory :category="category" @over="handleOk"></editCategory>
    </a-modal>
  </div>
</template>

<script>
import editCategory from './editCategory.vue';

export default {
  name: 'index.vue',
  components: {
    editCategory,
  },
  props: ['category'],
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
        this.$emit('over');
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
