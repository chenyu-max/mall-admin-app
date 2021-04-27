<template>
  <div class="product-list">
    <!--  搜索  -->
    <search @submit="searchSubmit" :category-list="categoryList"/>
    <a-button class="product-add-btn">
      <router-link :to="{name:'ProductAdd'}">添加商品</router-link>
    </a-button>
    <!--  表格  -->
    <productsTable :data="tableData"
                   :page="page"
                   @change="changePage"
                   :category-list="categoryList"
                   @edit="editProduct"
                   @remove="removeProduct"
    />
  </div>
</template>

<script>
import search from '@/components/search.vue';
import productsTable from '@/components/productsTable.vue';
import api from '@/api/product';
import categoryApi from '@/api/category';

export default {
  name: 'productList',
  data() {
    return {
      tableData: [],
      searchForm: {},
      page: {
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
        total: 1,
      },
      categoryList: [],
      categoryObj: {},
    };
  },
  components: {
    search,
    productsTable,
  },
  async created() {
    // 使用await 是为了让 category 先获取到 再去获取表单的信息
    await categoryApi.list()
      .then((res) => {
        this.categoryList = res.data;
        res.data.forEach((item) => {
          this.categoryObj[item.id] = item;
        });
      });
    this.getTableData();
  },
  methods: {
    searchSubmit(form) {
      this.searchForm = form;
      this.getTableData();
    },
    getTableData() {
      api.list({
        page: this.page.current,
        size: this.page.pageSize,
        ...this.searchForm,
      })
        .then((res) => {
          this.page.total = res.total;
          this.tableData = res.data.filter((item) => item.category)
            .map((item) => ({
              ...item,
              categoryName: this.categoryObj[item.category].name,
            }));
        });
    },
    changePage(page) {
      this.page = page;
      this.getTableData();
    },
    editProduct(record) {
      this.$router.push({
        name: 'ProductEdit',
        params: {
          id: record.id,
        },
      });
    },
    removeProduct(record) {
      this.$confirm({
        title: '确认删除',
        content: () => <div style="color:red;">{`确认删除标题为:${record.title}的商品`}</div>,
        onOk: () => {
          api.remove({ id: record.id })
            .then(() => {
              this.getTableData();
            });
        },
        onCancel() {
        },
        class: 'confirm-box',
      });
    },
  },
};
</script>

<style scoped lang="less">
.product-list {
  position: relative;

  .product-add-btn {
    position: absolute;
    top: 14px;
    right: 20px;
  }
}
</style>
