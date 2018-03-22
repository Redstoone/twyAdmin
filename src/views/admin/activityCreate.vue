<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px">
      <el-button size="small" type="primary" @click="handleAddActivity">添加活动</el-button>
      <el-button size="small" type="primary" @click="handleAddActivityLink">添加活动链接</el-button>
    </el-col>

    <el-col class="" :loading="listLoading">
    </el-col>
  </section>
</template>

<script>
// import api from '../../api/index.js'

export default {
  data () {
    return {}
  }
}
</script>

<style scoped>
</style>
