<template>
  <div class="edit-category">
    <a-form-model ref="category" class="add-category-form"
                  :model="category" :rules="rules" v-bind="layout">
      <a-form-model-item has-feedback label="类目ID" prop="id">
        <a-input v-model="category.id" autocomplete="off" disabled/>
      </a-form-model-item>
      <a-form-model-item has-feedback label="类目名称" prop="name" requird>
        <a-input v-model="category.name" autocomplete="off"/>
      </a-form-model-item>
      <a-form-model-item label="子类目" prop="c_items">
        <a-select
          mode="tags"
          placeholder="选择子类目(可不填)"
          v-model="category.c_items"
        >
        </a-select>
      </a-form-model-item>

      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }" style="text-align: center">
        <a-button type="primary" @click="submitForm('category')">
          确认修改
        </a-button>
        <a-button @click="resetForm('category')">
          重置
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import categoryApi from '@/api/category';

export default {
  name: 'editCategory',
  props: ['category'],
  data() {
    const validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入类目名称'));
      } else {
        callback();
      }
    };
    return {
      rules: {
        name: [{
          validator: validateName,
          trigger: 'change',
        }],
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          categoryApi.edit(this.category)
            .then(() => {
              this.$emit('over');
              this.$message.success('类目修改成功');
            })
            .catch((err) => {
              this.$message.error(err);
            });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>

</style>
