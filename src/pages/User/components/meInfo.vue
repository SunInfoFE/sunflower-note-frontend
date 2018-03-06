/*
create by YOU
*/
<template>
  <div style="max-width: 500px; margin: 50px auto 0">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="姓名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="form.sex" placeholder="请选择性别">
          <el-option label="男" value="1"></el-option>
          <el-option label="女" value="2"></el-option>
          <el-option label="未知" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="授权码">
        <el-input v-model="form.emailToken" type="password"></el-input>
      </el-form-item>
      <el-form-item label="所属小组">
        <el-input v-model="form.group" disabled></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存修改</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/babel">
  export default {
    data() {
      return {
        form: {
          name: '李四',
          sex: '0',
          email: 'lsi@suninfo.com',
          group: '后勤组',
          emailToken: 'qqqqqq'
        }
      }
    },
    methods: {
      onSubmit() {
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
