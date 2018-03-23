<template>
  <section>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px">
      <el-button size="small" type="primary" @click="handleAddTeacher">添加老师</el-button>
    </el-col>

    <el-col :span="24">
      <el-table class="ctable" :data="teacherList" stripe border highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%">
        <el-table-column prop="number" label="工号">
        </el-table-column>
        <el-table-column label="头像" width="60">
          <template slot-scope="scope">
            <img :src="scope.row.imgUrl" class="touxiang" />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="名字" sortable></el-table-column>
        <el-table-column prop="cellphone" label="手机号码" sortable></el-table-column>
        <el-table-column prop="IDcard" label="身份证" sortable></el-table-column>`
        <el-table-column prop="clazzNum" label="上课的班级">
           <template slot-scope="scope">
             {{scope.row.clazzNum}}

             <a href="#" @click="studentView(scope.row.teacherId)">查看</a>
           </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="handleDel(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>

    <el-dialog title="添加老师" :visible.sync="courseVisible" :close-on-click-modal="false" width="480px">
      <el-form :model="addCourse" label-width="100px" :rules="addCourseRules" ref="addCourse">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="addCourse.name" auto-complete="off" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="头像" prop="name">
          <el-upload
            class="avatar-uploader"
            action="http://oss.iclass.cn/formFile"
            :headers="{'Content-Type': 'application/x-www-form-urlencoded'}"
            :show-file-list="false"
            name="qqfile"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :data="{bucketName:'smallfiles', source: 'SOOC'}">
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
        groupId: JSON.parse(sessionStorage.getItem('groupId')),
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
      imageUrl: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
      courseLoading: false
    }
  },
  created () {
    this.getTeacherList()
  },
  methods: {
    getTeacherList () {
      api.orgTeacherList({groupId: JSON.parse(sessionStorage.getItem('groupId'))}).then(res => {
        this.teacherList = res.data.array
      })
    },
    selsChange (sels) {
      this.sels = sels
      this.addCourse = {
        groupId: JSON.parse(sessionStorage.getItem('groupId')),
        name: null,
        cellphone: null,
        IDcard: null,
        imgUrl: null
      }
    },
    handleAddTeacher  () {
      this.courseVisible = true
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
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
    studentView (teacherId) {
      console.log('查看学生')
    }
  }
}
</script>

<style scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
  }
  .avatar {
    width: 150px;
    height: 150px;
    display: block;
  }
  .touxiang{
    border:1px solid #979797;
    width:36px;
    height:36px;
    border-radius:100%;
  }
</style>
