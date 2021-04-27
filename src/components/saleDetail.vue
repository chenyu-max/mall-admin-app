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
      <a-form-model-item label="商品库存" prop="inventory" required>
        <a-input v-model="form.inventory"/>
      </a-form-model-item>
      <a-form-model-item label="计量单位" prop="unit" required>
        <a-input v-model="form.unit"/>
      </a-form-model-item>
      <a-form-model-item label="商品相册" prop="images">
        <a-upload
          :action="'https://mallapi.duyiedu.com/upload/images?appkey='+$store.state.user.appkey"
          list-type="picture-card"
          :file-list="fileList"
          name="avatar"
          @preview="handlePreview"
          @change="handleChange"
        >
          <div v-if="fileList.length < 8">
            <a-icon type="plus"/>
            <div class="ant-upload-text">
              上传
            </div>
          </div>
        </a-upload>
        <a-modal :visible="previewVisible" :footer="form.c_item" @cancel="handleCancel">
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
  created() {
    if (this.form.images.length > 0) {
      this.fileList = this.form.images.map((item, index) => ({
        uid: index,
        name: `image-${index}`,
        status: 'done',
        url: item,
      }));
    }
  },
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
    handleChange({
      file,
      fileList,
    }) {
      if (file.status === 'done') {
        this.form.images.push(file.response.data.url);
      } else if (file.status === 'removed') {
        this.form.images = this.form.images.filter((item) => item !== file.response.data.url);
      }
      this.fileList = fileList;
    },
    next() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit('next', this.form);
          return true;
        }
        return false;
      });
    },
    prev() {
      this.$emit('prev');
    },
  },
};
</script>

<style scoped>

</style>
