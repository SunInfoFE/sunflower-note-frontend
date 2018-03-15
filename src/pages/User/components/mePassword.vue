/*
create by YOU
*/
<template>
  <div>
    <div style="max-width: 500px; margin: 50px auto 0; padding: 10px">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input v-model="form.oldPassword" type="password"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="form.newPassword" type="password"></el-input>
        </el-form-item>
        <el-form-item label="重复密码" prop="repeatPassword">
          <el-input v-model="form.repeatPassword" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确认修改</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script type="text/babel">
  import $axios from '@/plugins/ajax'
  export default {
    data() {
      return {
        form: {
          oldPassword: '',
          newPassword: '',
          repeatPassword: ''
        },
        rules: {
          oldPassword: [{required: true, message: '不能为空', trigger: 'blur'}],
          newPassword: [{required: true, message: '不能为空', trigger: 'blur'}],
          repeatPassword: [
            {required: true, message: '不能为空', trigger: 'blur'},
            {
              validator: (rule, value, callback) => {
                if (value !== this.form.newPassword) {
                  return callback(new Error('两次输入密码不一致！'))
                } else {
                  callback();
                }
              },
              trigger: 'blur'
            }
          ]
        }
      }
    },
    methods: {
      onSubmit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            $axios.post('/user/changePassword', {
              oldPassword: this.form.oldPassword,
              newPassword: this.form.newPassword
            }).then(({data}) => {
              if (data.status) {
                this.$message.success(data.data)
              } else {
                this.$message.error(data.data)
              }
            })
          }
        })
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
