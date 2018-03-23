<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px">
      <el-button size="small" type="primary" @click="handleAdd">添加网点</el-button>
    </el-col>

    <!--列表-->
    <el-table class="ctable" :data="orgList" stripe border highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%">
      <el-table-column prop="indexOrder" label="序号" width="50
      ">
      </el-table-column>
      <el-table-column prop="name" label="网点" sortable>
      </el-table-column>
      <el-table-column prop="adminName" label="管理员账号" sortable>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="handleDel(scope.$index, scope.row)">删除</el-button>
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">信息编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--编辑界面-->
    <el-dialog title="编辑网点" :visible.sync="editFormVisible" :close-on-click-modal="false" width="480px">
      <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
        <el-form-item label="网点名称" prop="name">
          <el-input v-model="editForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="网点地址" prop="address">
          <el-input v-model="editForm.address" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="telphone">
          <el-input v-model="editForm.telphone"></el-input>
        </el-form-item>
        <el-form-item label="管理员账号" prop="adminname">
          <el-input v-model="editForm.adminname" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="管理员密码" prop="password">
          <el-input type="password" v-model="editForm.password" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>

    <!--新增界面-->
    <el-dialog title="添加网点" :visible.sync="addFormVisible" :close-on-click-modal="false" width="480px">
      <el-form :model="addForm" label-width="100px" :rules="addFormRules" ref="addForm">
        <el-form-item label="网点名称" prop="name">
          <el-input v-model="addForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="网点地址" prop="address">
          <el-input v-model="addForm.address" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="telphone">
          <el-input v-model="addForm.telphone"></el-input>
        </el-form-item>
        <el-form-item label="管理员账号" prop="adminname">
          <el-input v-model="addForm.adminname" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="管理员密码" prop="password">
          <el-input type="password" v-model="addForm.password" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">保存</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import api from '../../api/index.js'

export default {
  data () {
    return {
      filters: {
        name: ''
      },
      orgList: [],
      total: 0,
      page: 1,
      listLoading: false,
      sels: [], // 列表选中列

      editFormVisible: false, // 编辑界面是否显示
      editLoading: false,
      editFormRules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }]
      },

      // 编辑界面数据
      editForm: {
        name: '',
        address: '',
        telphone: null,
        adminname: '',
        password: ''
      },

      addFormVisible: false, // 新增界面是否显示
      addLoading: false,
      addFormRules: {
        name: [{ required: true, message: '请输入网点名称', trigger: 'blur' }],
        address: [{ required: true, message: '请输入网点地址', trigger: 'blur' }],
        telphone: [{ required: true, message: '请输入联系电话', trigger: 'blur' }],
        adminname: [{ required: true, message: '请输入管理员账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入管理员密码', trigger: 'blur' }]
      },
      // 新增界面数据
      addForm: {
        name: '',
        address: '',
        telphone: null,
        adminname: '',
        password: ''
      }
    }
  },
  methods: {
    // 获取列表
    getOrgList () {
      this.listLoading = true
      api.orgListPage().then(res => {
        this.orgList = res.data.array
        this.listLoading = false
      })
    },

    // 删除
    handleDel (index, row) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        api.orgDel({groupId: row.groupId}).then((res) => {
          this.listLoading = false
          this.getOrgList()
        })
      }).catch(() => {})
    },

    // 显示编辑界面
    handleEdit (index, row) {
      this.editFormVisible = true
      this.editForm = {
        groupId: this.orgList[index].groupId,
        name: this.orgList[index].name,
        address: this.orgList[index].address,
        telphone: this.orgList[index].telphone,
        adminname: this.orgList[index].adminName,
        password: this.orgList[index].password
      }
    },
    // 显示新增界面
    handleAdd () {
      this.addFormVisible = true
    },
    // 编辑
    editSubmit () {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.editLoading = true
          let para = Object.assign({}, this.editForm)
          api.orgEdit(para).then((res) => {
            this.editLoading = false
            this.$notify({
              message: '修改信息成功',
              type: 'success'
            })
            this.$refs['editForm'].resetFields()
            this.editFormVisible = false
            this.getOrgList()
          })
        }
      })
    },
    // 新增
    addSubmit () {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.addLoading = true
          let para = Object.assign({}, this.addForm)
          api.orgCreate(para).then(res => {
            if (res.status === 'succ') {
              this.addLoading = false
              this.$notify({
                message: '添加网点成功',
                type: 'success'
              })
              this.$refs['addForm'].resetFields()
              this.addFormVisible = false
              this.getOrgList()
            } else {
              this.$message({
                message: res.message,
                type: 'error',
                duration: 0
              })
            }
          })
        }
      })
    },
    selsChange (sels) {
      this.sels = sels
    }
  },
  mounted () {
    this.getOrgList()
  }
}
</script>

<style scoped>
</style>
