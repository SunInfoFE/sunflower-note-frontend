/*
create by YOU
*/
<template>
  <div style="max-width: 500px; margin: 50px auto 0; padding: 10px">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-select v-model="form.sex" style="width: 100%" placeholder="请选择性别">
          <el-option label="男" value="male"></el-option>
          <el-option label="女" value="female"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" disabled></el-input>
      </el-form-item>
      <el-form-item label="授权码" prop="licenseKey">
        <el-input v-model="form.licenseKey" type="password" placeholder="请输入新授权码"></el-input>
      </el-form-item>
      <el-form-item label="所属小组" prop="groupName">
        <el-input v-model="form.groupName" disabled></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="form.remark"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存修改</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/babel">
  import $axios from '@/plugins/ajax'
  export default {
    data() {
      return {
        data: {},
        form: {
          name: '',
          sex: '',
          email: '',
          groupName: '',
          licenseKey: '',
          remark: ''
        },
        rules: {
          name: [{required: true, message: '不能为空', trigger: 'blur'}],
          sex: [{required: true, message: '不能为空', trigger: 'blur'}],
          groupName: [{required: true, message: '不能为空', trigger: 'blur'}]
        }
      }
    },
    mounted() {
      this.getData()
    },
    methods: {
      getData() {
        //
        $axios.get('/user/getUserInfo').then(({data}) => {
          if (data.status) {
            this.form = data.data[0]
          }
        })
      },
      onSubmit() {
        $axios.post('/user/changeUserInfo', this.form).then(({data}) => {
          if (data.status) {
            this.$message.success(data.data)
          } else {
            this.$message.error(data.data)
          }
        })
      },
      onReset() {
        this.getData()
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
