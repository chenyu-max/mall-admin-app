<template>
  <div class="find-back-password-container">
    <a-form-model ref="findBackData" class="register-form"
                  :model="findBackData" :rules="rules" v-bind="layout">
      <a-form-model-item has-feedback label="邮箱" prop="email">
        <a-input v-model="findBackData.email"/>
      </a-form-model-item>
      <a-form-model-item has-feedback label="请输入新密码" prop="password">
        <a-input v-model="findBackData.password" type="password" autocomplete="off"/>
      </a-form-model-item>
      <a-form-model-item has-feedback label="确认新密码" prop="password2">
        <a-input v-model="findBackData.password2" type="password" autocomplete="off"/>
      </a-form-model-item>
      <a-form-model-item has-feedback label="验证码" prop="code">
        <a-input v-model="findBackData.code"/>
      </a-form-model-item>
      <a-form-model-item style="text-align: center" :wrapper-col="{ span: 14, offset: 4 }">
        <a-button @click="getEmailCode">
          获取验证码
        </a-button>
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }" style="text-align: center">
        <a-button type="primary" @click="submitForm('findBackData')">
          提交
        </a-button>
        <a-button style="margin-left: 70px">
          <router-link :to="{name:'Login'}">返回登录</router-link>
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import api from '@/api/user';

export default {
  name: 'findBackPassword',
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
    const checkPassword2 = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请再次输入密码'));
      }
      if (value !== this.findBackData.password) {
        return callback(new Error('两次输入的密码不一致'));
      }
      return callback();
    };
    return {
      findBackData: {
        password: '',
        email: '',
        password2: '',
        code: '',
      },
      rules: {
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
    getEmailCode() {
      const emailReg = /^[\w-]+@[\w.-]+.com$/;
      if (emailReg.test(this.findBackData.email)) {
        api.getCode({ email: this.findBackData.email })
          .then(() => {
            this.$message.success('验证码发送成功');
          })
          .catch((err) => {
            this.$message.error(err);
          });
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        // 如果所有的数据校验没有问题，则 valid 为 true
        if (valid) {
          const data = {
            password: this.findBackData.password,
            email: this.findBackData.email,
            code: this.findBackData.code,
          };
          api.findBackPassword(data)
            .then(() => {
              this.$message.success('修改成功，请登录');
              this.$router.push({
                name: 'Login',
              });
            })
            .catch(() => {
              this.$message.error('修改失败，请检查信息是否正确');
            });
          return true;
        }
        window.console.log('error register!!');
        return false;
      });
    },
  },
};
</script>

<style scoped lang="less">
.find-back-password-container {
  position: absolute;
  width: 70vw;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  border: 1px solid #eee;
  padding-top: 40px;
}
</style>
