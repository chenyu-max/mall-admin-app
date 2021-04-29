<template>
  <div class="change-password-container">
    <a-form-model ref="changePasswordDataForm" class="change-password-data-form"
                  :model="changePasswordDataForm" :rules="rules" v-bind="layout">
      <a-form-model-item has-feedback label="原密码" prop="password">
        <a-input v-model="changePasswordDataForm.password" type="password" autocomplete="off"/>
      </a-form-model-item>
      <a-form-model-item has-feedback label="新密码" prop="newPassword">
        <a-input v-model="changePasswordDataForm.newPassword" type="password" autocomplete="off"/>
      </a-form-model-item>
      <a-form-model-item has-feedback label="确认新密码" prop="newPassword2">
        <a-input v-model="changePasswordDataForm.newPassword2"
                 type="password" autocomplete="off"/>
      </a-form-model-item>
      <a-form-model-item has-feedback label="验证码" prop="code">
        <a-input v-model="changePasswordDataForm.code"/>
      </a-form-model-item>
      <a-form-model-item style="text-align: center" :wrapper-col="{ span: 14, offset: 4 }">
        <a-button @click="getEmailCode">
          获取验证码
        </a-button>
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }" style="text-align: center">
        <a-button type="primary" @click="submitForm('changePasswordDataForm')">
          确认修改
        </a-button>
        <a-button style="margin-left: 70px" @click="resetForm('changePasswordDataForm')">
          重置
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import api from '@/api/user';

export default {
  name: 'changePassword',
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
    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
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
    const validateNewPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'));
      } else if (value === this.changePasswordDataForm.password) {
        callback(new Error('新密码与原密码相同'));
      } else {
        callback();
      }
    };
    const checkNewPassword2 = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请再次输入密码'));
      }
      if (value !== this.changePasswordDataForm.newPassword) {
        return callback(new Error('两次输入的密码不一致'));
      }
      return callback();
    };
    return {
      changePasswordDataForm: {
        password: '',
        email: this.$store.state.user.email,
        newPassword: '',
        newPassword2: '',
        code: '',
        username: this.$store.state.user.username,
      },
      // 表单数据判定规则
      rules: {
        password: [{
          validator: validatePassword,
          trigger: 'change',
        }],
        newPassword: [{
          validator: validateNewPassword,
          trigger: 'change',
        }],
        newPassword2: [{
          validator: checkNewPassword2,
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
          const data = {
            password: this.changePasswordDataForm.password,
            email: this.changePasswordDataForm.email,
            code: this.changePasswordDataForm.code,
            username: this.changePasswordDataForm.username,
            newPassword: this.changePasswordDataForm.newPassword,
          };
          api.changeUserInfo(data)
            .then(() => {
              this.$message.success('密码修改成功');
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
      if (emailReg.test(this.changePasswordDataForm.email)) {
        api.getCode({ email: this.changePasswordDataForm.email })
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
