<template>
  <div class="category-container">
    <div class="table">
      <a-table :columns="columns" :data-source="data">
        <div slot="operation" slot-scope="text,record">
          <PopUps :category="record" @over="getCategoryList"
                  style="display: inline-block"></PopUps>
        </div>
      </a-table>
    </div>
  </div>
</template>
<script>
import PopUps from '@/views/page/category/PopUps.vue';
import categoryApi from '@/api/category';

const columns = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '类目名称',
    dataIndex: 'name',
    key: 'name',
    ellipsis: true,
  },
  {
    title: '子类目数量',
    dataIndex: 'c_itemsNumber',
    key: 'c_itemsNumber',
    ellipsis: true,
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    width: 200,
    ellipsis: true,
    scopedSlots: { customRender: 'operation' },
  },
];

export default {
  components: {
    PopUps,
  },
  data() {
    return {
      data: [],
      columns,
    };
  },
  methods: {
    getCategoryList() {
      categoryApi.list()
        .then((res) => {
          this.data = [];
          res.data.forEach((item) => {
            this.data.push({
              id: item.id,
              name: item.name,
              c_items: item.c_items,
              key: item.id,
              c_itemsNumber: item.c_items.length,
            });
          });
        });
    },
  },
  async created() {
    await this.getCategoryList();
  },
};
</script>

<style scoped lang="less">
.category-container {
  //display: flex;
}
</style>
