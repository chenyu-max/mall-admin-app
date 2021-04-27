<template>
  <div class="search-box">
    <a-form-model layout="inline" :model="searchForm" @submit="handleSubmit" @submit.native.prevent>
      <a-form-model-item label="检索关键字">
        <a-input v-model="searchForm.searchWord" placeholder="查询请输入关键字">
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="商品类目">
        <a-select
          show-search
          allowClear
          placeholder="请选择商品类目"
          style="width: 200px"
          @change="handleChange"
        >
          <a-select-option v-for="c in categoryList" :key="c.id" :value="c.id">
            {{ c.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item>
        <a-button
          type="primary"
          html-type="submit"
        >
          搜索
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>

export default {
  name: 'search',
  data() {
    return {
      searchForm: {
        searchWord: '',
        category: '',
      },
    };
  },
  props: ['categoryList'],
  methods: {
    // 提交表单的时候出发的事件
    handleSubmit() {
      this.$emit('submit', this.searchForm);
    },
    handleChange(val) {
      this.searchForm.category = val;
    },
  },
};
</script>

<style scoped lang="less">
.search-box {
  padding: 10px 30px;
}
</style>
