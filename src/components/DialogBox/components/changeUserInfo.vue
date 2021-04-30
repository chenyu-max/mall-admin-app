<template>
  <div class="change-user-info-container">
    <a-form-model ref="changeUserInfoForm" class="change-user-info-form"
                  :model="changeUserInfoForm" :rules="rules" v-bind="layout">
      <a-form-model-item has-feedback label="用户名" prop="username">
        <a-input v-model="changeUserInfoForm.username" autocomplete="off"/>
      </a-form-model-item>
      <a-form-model-item has-feedback label="邮箱" prop="email">
        <a-input v-model="changeUserInfoForm.email" autocomplete="off" disabled/>
      </a-form-model-item>
      <a-form-model-item has-feedback label="密码" prop="password">
        <a-input v-model="changeUserInfoForm.password" type="password" autocomplete="off"/>
      </a-form-model-item>
      <a-form-model-item has-feedback label="身份" prop="email">
        <a-select v-model="changeUserInfoForm.role" placeholder="选择你的身份" default-value="customer">
          <a-select-option value="customer">customer</a-select-option>
          <a-select-option value="admin">admin</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item has-feedback label="验证码" prop="code">
        <a-input v-model="changeUserInfoForm.code"/>
      </a-form-model-item>
      <a-form-model-item style="text-align: center" :wrapper-col="{ span: 14, offset: 4 }">
        <a-button @click="getEmailCode">
          获取验证码
        </a-button>
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }" style="text-align: center">
        <a-button type="primary" @click="submitForm('changeUserInfoForm')">
          确认修改
        </a-button>
        <a-button style="margin-left: 70px" @click="resetForm('changeUserInfoForm')">
          重置
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import api from '@/api/user';

export default {
  name: 'changeUserInfo',
  data() {
    const emailReg = /^[\w-]+@[\w.-]+.com$/;
    const codeReg = /^\d{6}$/;
    const checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入邮箱'));
      }
      if (emailReg.test(value)) {
        return callback();
      }
      return callback(new Error('邮箱格式不正确'));
    };
    const checkCode = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请输入验证码'));
      }
      if (!codeReg.test(value)) {
        return callback(new Error('验证码格式不正确'));
      }
      return callback();
    };
    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    const validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else {
        callback();
      }
    };
    return {
      changeUserInfoForm: {
        password: '',
        email: this.$store.state.user.email,
        code: '',
        username: this.$store.state.user.username,
        role: this.$store.state.user.role,
      },
      // 表单数据判定规则
      rules: {
        username: [{
          validate: validateUsername,
          trigger: 'change',
        }],
        password: [{
          validator: validatePassword,
          trigger: 'change',
        }],
        code: [{
          validator: checkCode,
          trigger: 'change',
        }],
        email: [{
          validator: checkEmail,
          triggers: 'change',
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
        // 如果所有的数据校验没有问题，则 valid 为 true
        if (valid) {
          api.changeUserInfo(this.changeUserInfoForm)
            .then(() => {
              this.$message.success('用户信息修改成功');
              this.$store.dispatch('setUserInfo', {
                username: this.changeUserInfoForm.username,
                appkey: this.$store.state.user.appkey,
                role: this.changeUserInfoForm.role,
                email: this.changeUserInfoForm.email,
              })
                .then(() => {
                  this.$router.options.routes.forEach((item) => {
                    if (item.name === 'Product') {
                      item.children.forEach((child) => {
                        const obj = child;
                        if (obj.name === 'Category') {
                          if (this.$store.state.user.role !== 'admin') {
                            obj.meta.hidden = true;
                          } else {
                            obj.meta.hidden = false;
                          }
                        }
                      });
                    }
                  });
                  if (this.$store.state.user.role !== 'admin') {
                    if (this.$route.name === 'Category') {
                      this.$router.replace({
                        name: 'Index',
                      });
                    }
                  }
                });
              this.$emit('over');
            })
            .catch((err) => {
              this.$message.error(err);
            });
          return true;
        }
        return false;
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getEmailCode() {
      const emailReg = /^[\w-]+@[\w.-]+.com$/;
      if (emailReg.test(this.changeUserInfoForm.email)) {
        api.getCode({ email: this.changeUserInfoForm.email })
          .then(() => {
            this.$message.success('验证码发送至你的邮箱');
          })
          .catch((err) => {
            this.$message.error(err);
          });
      }
    },
  },
};
</script>
