<template>
  <section>
    <div class="org-wrap">
      <div class="edit-wrap">
        <span @click="editFormVisible = true">修改编辑</span>
      </div>
      <p>* 网点名称：{{editForm.name}}</p>
      <p>* 网点地址：{{editForm.address}}</p>
      <p>* 联系电话：{{editForm.telphone}}</p>
    </div>

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
          <!-- <el-input v-model="editForm.adminname" auto-complete="off"></el-input> -->
          <span>{{editForm.adminname}}</span>
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
  </section>
</template>

<script>
import api from '../../api/index.js'

export default {
  data () {
    return {
      editFormVisible: false,
      editLoading: false,
      editFormRules: {
        name: [{ required: true, message: '请输入网点名称', trigger: 'blur' }],
        address: [{ required: true, message: '请输入网点地址', trigger: 'blur' }],
        telphone: [{ required: true, message: '请输入联系电话', trigger: 'blur' }],
        adminname: [{ required: true, message: '请输入管理员账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入管理员密码', trigger: 'blur' }]
      },

      // 编辑界面数据
      editForm: {
        name: '',
        address: '',
        telphone: null,
        adminname: '',
        password: ''
      }
    }
  },
  mounted () {
    this.getOrgInfo()
  },
  methods: {
    getOrgInfo () {
      api.orgInfo().then(res => {
        if (res.status === 'succ') {
          this.editForm = {
            name: res.data.name,
            address: res.data.address,
            telphone: res.data.telphone,
            adminname: res.data.adminName,
            password: res.data.name,
            groupId: res.data.groupId
          }
          sessionStorage.setItem('groupId', JSON.stringify(res.data.groupId))
        } else {
          this.$notify({
            message: res.message,
            type: 'error',
            duration: 0
          })
        }
      })
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
            this.getOrgInfo()
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.org-wrap{
  width: 100%;
  padding: 15px;
  box-sizing: border-box;
  font-size:14px;
  color:#000;
  border:1px solid #e1e1e1;
  position: relative;
  margin-top: 20px;
}
.org-wrap p{
  margin: 20px 0;
}
.edit-wrap{
  position: absolute;
  right: 20px;
  font-size: 14px;
  color: #0086e4;
}
.edit-wrap span{
  text-decoration: underline;
  cursor: pointer;
}
</style>
