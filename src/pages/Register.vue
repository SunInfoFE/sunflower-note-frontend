<template>
  <section id="register-page">
    <h1>周报管理系统</h1>
    <span>注册新用户</span>
    <div style="max-width: 500px; margin: 50px auto 0">
      <el-form ref="form" :model="form" label-width="80px" style="margin-left: -80px">
        <el-form-item label="邮箱">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="重复密码">
          <el-input v-model="form.repeatPassword" type="password"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.userName"></el-input>
        </el-form-item>
        <el-form-item label="小组">
          <el-select style="width: 100%" v-model="form.groupID" placeholder="请选择用户">
            <el-option v-for="item in groups" :label="item.groupName" :value="item.groupID"
                       :key="item.groupID"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%" type="primary" @click="onSubmit">确认注册</el-button>
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
          userName: '',
          groupID: ''
        },
        groups: [
          {groupID: 123213, groupName: '后勤'},
          {groupID: 424243, groupName: '前台'},
          {groupID: 188821, groupName: '人事'}
        ]
      }
    },
    computed: {},
    created () {
    },
    methods: {
      onSubmit() {
      }
    }
  }
</script>

<style>
  #register-page{
    width: 100%;
    text-align: center;
    position: absolute;
    top: 40%;
    transform: translateY(-40%);
  }
</style>


