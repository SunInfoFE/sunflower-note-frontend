/*
create by YOU
*/
<template>
  <div>
    <el-form class="topForm" label-position="top" :model="form">
      <el-form-item label="周报名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="本周工作总结">
        <el-input v-model="form.region" type="textarea" :rows="6"></el-input>
      </el-form-item>
      <el-form-item label="下周工作计划">
        <el-input v-model="form.type" type="textarea" :rows="6"></el-input>
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
          region: '',
          type: ''
        }
      }
    },
    props: {
      defaultData: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .topForm
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
