<template>
  <section>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px">
      <el-button size="small" type="primary" @click="handleAddTeacher">添加老师</el-button>
    </el-col>

    <el-col :span="24">
      <el-table class="ctable" :data="teacherList" stripe border highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%">
        <el-table-column prop="indexOrder" label="工号" width="50">
        </el-table-column>
        <el-table-column prop="name" label="头像" sortable>
        </el-table-column>
        <el-table-column prop="adminName" label="名字" sortable></el-table-column>
        <el-table-column prop="adminName" label="手机号码（登录账号）" sortable></el-table-column>
        <el-table-column prop="adminName" label="身份证（后六位密码）" sortable></el-table-column>`
        <el-table-column prop="adminName" label="上课的班级" sortable></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">信息编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </section>
</template>

<script>
// import api from '../../api/index.js'
export default {
  name: 'Teacher',
  data () {
    return {
      listLoading: false,
      teacherList: []
    }
  },
  methods: {
    selsChange (sels) {
      this.sels = sels
    }
  }
}
</script>
