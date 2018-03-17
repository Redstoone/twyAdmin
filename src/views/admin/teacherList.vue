<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px">
      <el-button size="small" type="primary" @click="handleAdd">添加老师</el-button>
    </el-col>

    <!--列表-->
    <el-table class="ctable" :data="orgList" stripe border highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%">
      <el-table-column prop="indexOrder" label="序号" width="50
      ">
      </el-table-column>
      <el-table-column prop="name" label="名字" sortable>
      </el-table-column>
      <el-table-column prop="adminName" label="管理员账号" sortable>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">信息编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>

<script>
import api from '../../api/index.js'

export default {
  data () {
    return {}
  }
}
</script>