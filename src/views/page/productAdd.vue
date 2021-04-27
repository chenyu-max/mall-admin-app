<template>
  <div class="product-detail">
    <a-steps :current="current" class="product-steps">
      <a-step v-for="item in steps" :key="item.title" :title="item.title"/>
    </a-steps>
    <div class="steps-content">
      <basic-detail v-if="current === 0" @next="next" :form="form"></basic-detail>
      <saleDetail v-else-if="current === 1" @next="next" @prev="prev" :form="form"></saleDetail>
    </div>
  </div>
</template>

<script>
import basicDetail from '@/components/basicDetail.vue';
import saleDetail from '@/components/saleDetail.vue';

export default {
  components: {
    basicDetail,
    saleDetail,
  },
  data() {
    return {
      current: 0,
      form: {
        title: '',
        desc: '',
        category: '',
        c_items: '',
        tags: [],
        price: 0,
        price_off: 0,
        unit: '',
        inventory: 0,
        images: [],
      },
      steps: [
        {
          title: '填写商品基本信息',
        },
        {
          title: '填写商品销售信息',
        },
      ],
    };
  },
  methods: {
    next(form) {
      this.form = {
        ...this.form,
        form,
      };
      if (this.current === 1) {
        // 提交数据
      }
      this.current += 1;
    },
    prev() {
      this.current -= 1;
    },
  },
};
</script>
<style scoped lang="less">
.product-detail {
  .product-steps {
    width: 50%;
    margin: 20px auto;
  }

  .steps-content {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 200px;
    text-align: center;
    padding-top: 80px;
  }

  .steps-action {
    margin-top: 24px;
  }
}
</style>
