<template>
  <section>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px">
      <el-button size="small" type="primary" @click="handleAddTeacher">添加老师</el-button>
    </el-col>

    <el-col :span="24">
      <el-table class="ctable" :data="teacherList" stripe border highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%">
        <el-table-column prop="number" label="工号" width="130">
        </el-table-column>
        <el-table-column label="头像" width="60">
          <template slot-scope="scope">
            <img :src="scope.row.imgUrl" class="touxiang" />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="名字" sortable width="180"></el-table-column>
        <el-table-column prop="cellphone" label="手机号码" sortable  width="130"></el-table-column>
        <el-table-column prop="IDcard" label="身份证" sortable  width="180">
          <template slot-scope="scope">
            {{scope.row.IDcard.substring(0,12)}}<span style="color:#63bb71;">{{scope.row.IDcard.substring(12)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="clazzNum" label="上课的班级">
           <template slot-scope="scope">
             {{scope.row.clazzNum}}

             <a href="javascript:;" class="btn-option" size="mini" @click="studentView(scope.row.teacherId)">查看</a>
           </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <a hrefr="javascript:;" class="btn-option" size="mini" @click="handleEdit(scope.row)">编辑</a>
            <a hrefr="javascript:;" class="btn-option" size="mini" @click="handleDel(scope.$index, scope.row)">删除</a>
          </template>
        </el-table-column>
      </el-table>
    </el-col>

    <el-dialog title="添加/编辑教师" :visible.sync="courseVisible" :close-on-click-modal="false" width="480px">
      <el-form :model="addCourse" label-width="70px" :rules="addCourseRules" ref="addCourse">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="addCourse.name" auto-complete="off" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="头像" prop="name">
          <el-upload
            class="avatar-uploader"
            action="http://api.twyxedu.com//api/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="手机" prop="cellphone">
          <el-input v-model="addCourse.cellphone" auto-complete="off" placeholder="请输入手机"></el-input>
        </el-form-item>
        <el-form-item label="身份证" prop="IDcard">
          <el-input v-model="addCourse.IDcard" auto-complete="off" placeholder="请输入身份证"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="courseVisible = false">取消</el-button>
        <el-button type="primary" @click.native="courseSubmit" :loading="courseLoading">提交</el-button>
      </div>
    </el-dialog>

    <el-dialog title="上课的班级" :visible.sync="clazzViewVisible" :close-on-click-modal="false" width="521px">
      <el-table class="ctable" :data="teacherClazzList" stripe border highlight-current-row v-loading="listLoading" style="width: 100%">
        <el-table-column prop="name" label="工号" width="120"></el-table-column>
        <el-table-column prop="studentNum" label="人数" width="120"></el-table-column>
        <el-table-column prop="teacherAName" label="老师A" width="120"></el-table-column>
        <el-table-column prop="teacherBName" label="老师B" width="120"></el-table-column>
      </el-table>
    </el-dialog>
  </section>
</template>

<script>
import api from '../../api/index.js'
export default {
  name: 'Teacher',
  data () {
    return {
      listLoading: false,
      teacherList: [],
      courseVisible: false,
      addCourse: {
        groupId: JSON.parse(localStorage.getItem('groupId')),
        name: null,
        cellphone: null,
        IDcard: null,
        imgUrl: null
      },
      addCourseRules: {
        name: [{ required: true, message: '请输入教师姓名', trigger: 'blur' }],
        imgUrl: [{ required: true, message: '请输入头像', trigger: 'blur' }],
        cellphone: [{ required: true, message: '请选手机', trigger: 'blur' }],
        IDcard: [{ required: true, message: '请输入身份证', trigger: 'blur' }]
      },
      imageUrl: '',
      courseLoading: false,
      teacherId: null,
      teacherClazzList: [],
      clazzViewVisible: false
    }
  },
  created () {
    this.getTeacherList()
  },
  methods: {
    getTeacherList () {
      api.orgTeacherList({groupId: JSON.parse(localStorage.getItem('groupId'))}).then(res => {
        this.teacherList = res.data.array
      })
    },
    selsChange (sels) {
      this.sels = sels
      this.addCourse = {
        groupId: JSON.parse(localStorage.getItem('groupId')),
        name: null,
        cellphone: null,
        IDcard: null,
        imgUrl: null
      }
    },
    handleAddTeacher  () {
      this.courseVisible = true
      this.teacherId = null
      this.addCourse = {
        groupId: null,
        name: null,
        cellphone: null,
        IDcard: null,
        imgUrl: null
      }
      this.imageUrl = null
      this.$refs['addCourse'].resetFields()
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = file.response
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    courseSubmit () {
      this.$refs.addCourse.validate(valid => {
        if (valid) {
          this.courseLoading = true
          let para = Object.assign({}, this.addCourse)
          para.imgUrl = this.imageUrl
          if (this.teacherId) {
            para.teacherId = this.teacherId
            api.orgTeacherEdit(para).then((res) => {
              if (res.status === 'succ') {
                this.courseLoading = false
                this.$notify({
                  message: '编辑教师成功',
                  type: 'success'
                })
                this.$refs['addCourse'].resetFields()
                this.courseVisible = false
                this.getTeacherList()
              } else {
                this.$notify({
                  message: res.message,
                  type: 'error',
                  duration: 0
                })
              }
            })
          } else {
            api.orgTeacherAdd(para).then((res) => {
              if (res.status === 'succ') {
                this.courseLoading = false
                this.$notify({
                  message: '添加教师成功',
                  type: 'success'
                })
                this.$refs['addCourse'].resetFields()
                this.courseVisible = false
                this.getTeacherList()
              } else {
                this.$notify({
                  message: res.message,
                  type: 'error',
                  duration: 0
                })
              }
            })
          }
        }
      })
    },
    handleDel (idx, row) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        api.orgTeacherDel({teacherId: row.teacherId}).then((res) => {
          if (res.status === 'succ') {
            this.listLoading = false
            this.getOrgList()
          } else {
            this.$notify({
              message: res.message,
              type: 'error',
              duration: 0
            })
          }
        })
      })
    },
    handleEdit (row) {
      this.courseVisible = true
      this.addCourse = {
        name: row.name,
        cellphone: row.cellphone,
        IDcard: row.IDcard,
        imgUrl: row.imgUrl
      }
      this.imageUrl = row.imgUrl
      this.teacherId = row.teacherId
      this.$refs['addCourse'].resetFields()
    },
    handleClose () {
      this.$refs['addCourse'].resetFields()
    },
    studentView (teacherId) {
      this.clazzViewVisible = true
      api.teacherClazz({teacherId: teacherId}).then(res => {
        if (res.status === 'succ') {
          this.teacherClazzList = res.data.array
        }
      })
    }
  }
}
</script>

<style scoped>
.touxiang{
  border:1px solid #979797;
  width:36px;
  height:36px;
  border-radius:100%;
}
</style>
