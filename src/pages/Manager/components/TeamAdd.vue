<template>
  <div>
    <el-form class="teamaddForm" label-position="top" :model="form" ref="form">
      <el-form-item label="组名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.remark" type="textarea" :rows="6"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/babel">
  export default {
    data () {
      return {
        form: {
          name: '',
          remark: ''
        }
      }
    },
    props: {
      defaultData: {
        type: Object,
        default() {
          return {}
        }
      },
      editData: {
      type: Object
      }
    },
     created() {
     if (this.editData !== undefined) {
     this.form = this.editData
     }
     }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .teamaddForm
    border: solid 1px #dedede
    .el-form-item
      margin: 0
      label
        width: 100%
        color: #fff
        background-color: rgb(84, 92, 100)
        padding: 0 10px
      .el-form-item__content
        line-height: 33px
        input, textarea
          border-radius: 0
          border: none
</style>
