<template>
  <div>
    Home
    <div>
      <el-button type="primary" @click="logout">退出登录</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Home',
  components: {},
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {
    logout() {
      this.$store.dispatch('FedLogOut').then(() => {
        this.$router.push('/login');
      });
    },
  },
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped></style>
