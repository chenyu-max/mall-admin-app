<template>
  <div class="register-container">
    <a-form-model ref="registerForm" class="register-form"
                  :model="registerForm" :rules="rules" v-bind="layout">
      <a-form-model-item has-feedback label="用户名" prop="username">
        <a-input v-model="registerForm.username"/>
      </a-form-model-item>
      <a-form-model-item has-feedback label="邮箱" prop="email">
        <a-input v-model="registerForm.email"/>
      </a-form-model-item>
      <a-form-model-item has-feedback label="密码" prop="password">
        <a-input v-model="registerForm.password" type="password" autocomplete="off"/>
      </a-form-model-item>
      <a-form-model-item has-feedback label="确认密码" prop="password2">
        <a-input v-model="registerForm.password2" type="password" autocomplete="off"/>
      </a-form-model-item>
      <a-form-model-item has-feedback label="验证码" prop="code">
        <a-input v-model="registerForm.code"/>
      </a-form-model-item>
      <a-form-model-item style="text-align: center" :wrapper-col="{ span: 14, offset: 4 }">
        <a-button @click="getEmailCode">
          获取验证码
        </a-button>
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }" style="text-align: center">
        <a-button type="primary" @click="submitForm('registerForm')">
          注册
        </a-button>
        <a-button style="margin-left: 70px" @click="resetForm('registerForm')">
          重置
        </a-button>
        <a-button style="margin-left: 70px">
          <router-link :to="{name:'Login'}">返回登录</router-link>
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
import api from '../../api/user';

export default {
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
    const validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
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
    const checkPassword2 = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请再次输入密码'));
      }
      if (value !== this.registerForm.password) {
        return callback(new Error('两次输入的密码不一致'));
      }
      return callback();
    };
    return {
      registerForm: {
        password: '',
        email: '',
        password2: '',
        code: '',
        username: '',
      },
      // 表单数据判定规则
      rules: {
        username: [{
          validator: validateUsername,
          trigger: 'change',
        }],
        password: [{
          validator: validatePassword,
          trigger: 'change',
        }],
        password2: [{
          validator: checkPassword2,
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
            password: this.registerForm.password,
            email: this.registerForm.email,
            code: this.registerForm.code,
            username: this.registerForm.username,
          };
          api.register(data)
            .then(() => {
              this.$router.push({
                name: 'Login',
              });
            })
            .catch((err) => {
              this.$message.error(err);
            });
          return true;
        }
        window.console.log('error register!!');
        return false;
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getEmailCode() {
      const emailReg = /^[\w-]+@[\w.-]+.com$/;
      if (emailReg.test(this.registerForm.email)) {
        api.getCode({ email: this.registerForm.email })
          .then(() => {
            this.$message.success('验证码发送成功');
          })
          .catch((err) => {
            this.$message.error(err);
          });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.register-container {
  position: absolute;
  width: 70vw;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  border: 1px solid #eee;
  padding-top: 40px;
}
</style>
