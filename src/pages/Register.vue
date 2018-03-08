<template>
  <section id="register-page">
    <h1>周报管理系统</h1>
    <span>注册新用户</span>
    <div style="max-width: 500px; margin: 50px auto 0">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px" style="margin-left: -80px">
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="重复密码" prop="repeatPassword">
          <el-input v-model="form.repeatPassword" type="password"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select style="width: 100%" v-model="form.sex" placeholder="请选择性别">
            <el-option label="男" value="male"></el-option>
            <el-option label="女" value="female"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="小组" prop="groupId">
          <el-select style="width: 100%" v-model="form.groupId" placeholder="请选择小组">
            <el-option v-for="item in groups" :label="item.name" :value="item.id"
                       :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-back" @click="gotoLogin">返回登录</el-button>
          <el-button type="primary" @click="onSubmit">确认注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </section>
</template>

<script>
  import $axios from '@/plugins/ajax'
  import Validaters from '@/common/utils/validaters';
  export default {
    data () {
      return {
        form: {
          email: '',
          password: '',
          repeatPassword: '',
          name: '',
          sex: '',
          groupId: '',
          remark: ''
        },
        rules: {
          email: [{required: true, message: '必须', trigger: 'blur'}],
          password: [{required: true, message: '必须', trigger: 'blur'}],
          repeatPassword: [
            {required: true, message: '必须', trigger: 'blur'},
            {
              validator: (rule, value, callback) => {
                if (value !== this.form.password) {
                  return callback(new Error('两次输入密码不一致！'))
                } else {
                  callback();
                }
              },
              trigger: 'blur'
            }
          ],
          name: [{required: true, message: '必须', trigger: 'blur'}],
          sex: [{required: true, message: '必须', trigger: 'blur'}],
          groupId: [{required: true, message: '必须', trigger: 'blur'}]
        },
        groups: []
      }
    },
    computed: {},
    created () {
      $axios.get('/group/groupManage/get').then(({data}) => {
        this.groups = data.data
      })
    },
    methods: {
      onSubmit() {
        let _self = this
        this.$refs.form.validate(valid => {
          if (valid) {
            $axios.post('/user/register', this.form).then(({data}) => {
              if (data.status) {
                this.$message.success('注册成功!')
                this.$store.dispatch('LOGIN', {
                  email: _self.form.email,
                  password: _self.form.password
                }).then(function (data) {
                  _self.$router.push('/');
                }).catch(function (data) {
                  _self.$message({
                    message: data.data,
                    type: 'error'
                  });
                })
              } else {
                this.$message.error(data.data)
              }
            })
          }
        })
      },
      gotoLogin() {
        this.$router.push('/Login')
      }
    }
  }
</script>

<style>
  #register-page {
    width: 100%;
    text-align: center;
    position: absolute;
    top: 40%;
    transform: translateY(-40%);
  }
</style>


