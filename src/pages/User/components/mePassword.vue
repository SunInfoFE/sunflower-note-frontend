/*
create by YOU
*/
<template>
  <div>
    <div style="max-width: 500px; margin: 50px auto 0">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="旧密码">
          <el-input v-model="form.oldPassword" type="password"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="form.newPassword" type="password"></el-input>
        </el-form-item>
        <el-form-item label="重复密码">
          <el-input v-model="form.repeatPassword" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存修改</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script type="text/babel">
  export default {
    data() {
      return {
        form: {
          oldPassword: '',
          newPassword: '',
          repeatPassword: ''
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
