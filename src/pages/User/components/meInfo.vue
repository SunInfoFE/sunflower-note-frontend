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
          <el-option label="男" value="male"></el-option>
          <el-option label="女" value="female"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email" disabled></el-input>
      </el-form-item>
      <el-form-item label="授权码">
        <el-input v-model="form.emailToken" type="password" placeholder="未投入使用" disabled></el-input>
      </el-form-item>
      <el-form-item label="所属小组">
        <el-input v-model="form.groupName" disabled></el-input>
      </el-form-item>
      <el-form-item label="备注">
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
          emailToken: '',
          remark: ''
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
        $axios.post('/user/changeUserInfo', {
          name: this.form.name,
          sex:  this.form.sex,
          remark:  this.form.remark
        }).then(({data}) => {
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
