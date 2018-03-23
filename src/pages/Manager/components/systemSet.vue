<template>
  <div style="max-width: 500px; margin: 50px auto 0; padding: 10px">
    <el-form ref="form" :model="form" :rules="rules" label-width="130px">
      <el-form-item label="注册邮箱后缀" prop="emailSuffix">
        <el-input v-model="form.emailSuffix"></el-input>
      </el-form-item>
      <el-form-item label="系统公告" prop="sysAnnouncement">
        <el-input v-model="form.sysAnnouncement" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="系统超时时间(s)" prop="timeOut">
        <el-input v-model="form.timeOut" type="number"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存更改</el-button>
        <el-button @click="onReset">重置更改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
  import $axios from '@/plugins/ajax'
  export default{
    data() {
      return {
        form: {
          emailSuffix: '',
          sysAnnouncement: '',
          timeOut: ''
        },
        rules: {
          emailSuffix: [
            {required: true, message: '不能为空', trigger: 'blur'},
            {
              pattern: /^@[a-zA-Z0-9]{1,20}\.[a-zA-Z0-9]{1,10}(;@[a-zA-Z0-9]{1,20}\.[a-zA-Z0-9]{1,10})*$/,
              message: '正确的邮箱后缀如@qq.com,多个邮箱请用;隔开',
              trigger: 'blur'
            }
          ],
          timeOut: [{required: true, message: '不能为空', trigger: 'blur'}]
        }
      }
    },
    mounted() {
      this.getData()
    },
    methods: {
      getData() {
        $axios.get('/system/getSysSetting').then(({data}) => {
          if (data.status) {
            this.form = data.data
          }
        })
      },
      onSubmit() {
        this.$refs.form.validate(valid => {
          if (valid) {
            $axios.post('/system/setSysSetting', this.form).then(({data}) => {
              if (data.status) {
                this.$message.success(data.data)
                this.getData()
              } else {
                this.$message.error(data.data)
              }
            })
          }
        })
      },
      onReset() {
        this.getData()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
