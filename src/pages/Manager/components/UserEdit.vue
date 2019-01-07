<template>
  <div>
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
      <el-form-item label="排序" prop="ordernum">
        <el-input v-model="form.ordernum"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="level">
        <el-select v-model="form.level" style="width: 100%">
          <el-option label="实习生" :value="1"></el-option>
          <el-option label="员工" :value="0"></el-option>
          <el-option label="监督实习" :value="2"></el-option>
        </el-select>
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
          remark: '',
          level: 0
        },
        rules: {
          name: [{required: true, message: '不能为空', trigger: 'blur'}],
          sex: [{required: true, message: '不能为空', trigger: 'blur'}],
          groupName: [{required: true, message: '不能为空', trigger: 'blur'}],
          ordernum: [{required: true, message: '不能为空', trigger: 'blur'}]
        }
      }
    },
    mounted() {
      this.userData.level = Number.parseInt(this.userData.level);
      this.form = this.userData
    },
    props: {
      userData: {
        type: Object,
        required: true
      }
    },
    methods: {
      onSubmit() {
        $axios.post('/user/changeUserInfo', this.form).then(({data}) => {
          if (data.status) {
            this.$message.success(data.data)
          } else {
            this.$message.error(data.data)
          }
          this.$emit('finish');
        })
      },
      onReset() {
        this.form = this.userData
      }
    }
  };
</script>