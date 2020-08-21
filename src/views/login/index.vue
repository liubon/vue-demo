<template>
  <div class="login">
    <h2 class="login-title">登录</h2>
    <div class="login-form">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="form.paw"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleLogin">立即登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Login',
  components: {},
  data() {
    return {
      form: {
        name: '',
        paw: '',
      },
    };
  },
  computed: {},
  mounted() {},
  methods: {
    async handleLogin() {
      const data = this.form;
      const result = await this.$store.dispatch('UserLogin', data);
      if (result) {
        this.$router.push('/');
      }
    },
  },
};
</script>
<style rel="stylesheet/scss" lang="less" scoped>
.login {
  .login-title {
    margin-top: 200px;
    text-align: center;
  }
  .login-form {
    margin: 40px auto;
    width: 400px;
  }
}
</style>
