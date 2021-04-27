<template>
  <div class="sale-detail">
    <a-form-model ref="ruleForm" :model="form" :rules="rules"
                  :label-col="{span:6}" :wrapper-col="{span:13}">
      <a-form-model-item ref="name" label="商品售价" required prop="price">
        <a-input v-model="form.price"/>
      </a-form-model-item>
      <a-form-model-item label="折扣价格" prop="price_off">
        <a-input v-model="form.price_off"/>
      </a-form-model-item>
      <a-form-model-item label="商品库存" prop="inventory">
        <a-input v-model="form.inventory"/>
      </a-form-model-item>
      <a-form-model-item label="计量单位" prop="unit">
        <a-input v-model="form.unit"/>
      </a-form-model-item>
      <a-form-model-item label="商品相册" prop="images">
        <a-upload
          :action="'https://mallapi.duyiedu.com/upload/images?appkey='+$store.state.user.appkey"
          list-type="picture-card"
          :file-list="fileList"
          name="avator"
          @preview="handlePreview"
          @change="handleChange"
        >
          <div v-if="fileList.length < 8">
            <a-icon type="plus"/>
            <div class="ant-upload-text">
              Upload
            </div>
          </div>
        </a-upload>
        <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
          <img alt="example" style="width: 100%" :src="previewImage"/>
        </a-modal>
      </a-form-model-item>
      <a-form-model-item label=" " class="next-btn">
        <a-button type="default" @click="prev">上一步</a-button>
        <a-button @click="next" type="primary">提交</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default {
  name: 'saleDetail',
  data() {
    return {
      previewVisible: false,
      previewImage: '',
      rules: {},
      fileList: [],
    };
  },
  props: ['form'],
  methods: {
    async handlePreview(file) {
      const obj = file;
      if (!file.url && !file.preview) {
        obj.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleCancel() {
      this.previewVisible = false;
    },
    handleChange({ fileList }) {
      this.fileList = fileList;
    },
    next() {
      this.$emit('next', this.form);
    },
    prev() {
      this.$emit('prev');
    },
  },
};
</script>

<style scoped>

</style>
