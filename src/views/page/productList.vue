<template>
  <div class="product-list">
    <!--  搜索  -->
    <search @submit="searchSubmit"/>
    <!--  表格  -->
  </div>
</template>

<script>
import search from '@/components/search.vue';

export default {
  name: 'productList',
  components: {
    search,
  },
  methods: {
    searchSubmit(form) {
      window.console.log(form);
    },
  },
};
</script>

<style scoped>

</style>
