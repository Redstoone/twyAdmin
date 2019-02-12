<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px" v-if="teacherType == 'list'">
      <el-button size="small" type="primary" @click="handleAdd">添加老师</el-button>
    </el-col>
    <el-col :span="24" class="toolbar txt-right" style="padding-bottom: 0px" v-else>
      <el-button size="small" type="primary" @click="goBack">取消返回</el-button>
      <el-button size="small" type="primary" @click="createTeacher">添加</el-button>
    </el-col>

    <!--列表-->
    <el-col :loading="listLoading" v-show="teacherType == 'list'">
      <el-table class="ctable" :data="teacherList" stripe border highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%">
        <el-table-column prop="id" label="序号" width="100">
          <template slot-scope="scope">
            <el-input class="teacher-num" v-model="scope.row.num" @blur="changeTeacherNum(scope.row.id, scope.row.num)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="照片">
          <template slot-scope="scope">
            <img :src="scope.row.imgUrl" class="user-img" >
          </template>
        </el-table-column>
        <el-table-column prop="name" label="名字" sortable> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <a hrefr="javascript:;" class="btn-option"  @click="delTeacher(scope.row.id)">删除</a>
            <a hrefr="javascript:;" class="btn-option"  @click="editTeacher(scope.row)">信息编辑</a>
          </template>
        </el-table-column>
      </el-table>
      <!-- <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="pageSize" layout="total, prev, pager, next" :total="total">
        </el-pagination>
      </div> -->
    </el-col>

    <el-col :loading="listLoading" v-show="teacherType != 'list'">
      <el-form :model="addTeacher" label-width="100px" :rules="addTeacherRules" ref="addTeacher">
        <el-form-item label="名称" prop="name">
          <el-input v-model="addTeacher.name" auto-complete="off" placeholder="请输入活动名称"></el-input>
        </el-form-item>
        <el-form-item label="手机详情图" prop="imgUrl">
          <p class="tip">图片尺寸 1125*2436</p>
          <el-upload
            class="avatar-uploader cover-uploader"
            :action="uploadUrl"
            :data="uploadForm"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imgUrl" :src="imgUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon cover-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="手机列表图" prop="listimgUrl">
          <p class="tip">图片尺寸 230*408</p>
          <el-upload
            class="avatar-uploader cover-uploader"
            :action="uploadUrl"
            :data="uploadForm"
            :show-file-list="false"
            :on-success="handleAvatarSuccess1"
            :before-upload="beforeAvatarUpload">
            <img v-if="listimgUrl" :src="listimgUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon cover-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="pc列表图" prop="pcimgUrl">
          <p class="tip">图片尺寸 200*200</p>
          <el-upload
            class="avatar-uploader cover-uploader"
            :action="uploadUrl"
            :data="uploadForm"
            :show-file-list="false"
            :on-success="handleAvatarSuccess2"
            :before-upload="beforeAvatarUpload">
            <img v-if="pcimgUrl" :src="pcimgUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon cover-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="职位" prop="job">
          <el-input type="textarea" :rows="3" v-model="addTeacher.job" auto-complete="off" placeholder="请输入职位"></el-input>
        </el-form-item>
        <el-form-item label="介绍" prop="intro">
          <el-input type="textarea" :rows="5" v-model="addTeacher.intro" auto-complete="off" placeholder="请输入介绍"></el-input>
        </el-form-item>
      </el-form>
    </el-col>
  </section>
</template>

<script>
import api from '../../api/index.js'

export default {
  data () {
    return {
      teacherList: [],
      teacherType: 'list',
      listLoading: false,
      addTeacher: {
        name: null,
        imgUrl: null,
        listimgUrl: null,
        pcimgUrl: null,
        job: null,
        intro: null
      },
      uploadUrl: global.UPLOADURL,
      uploadForm: global.UPLOAD_FORM,
      imgUrl: null,
      listimgUrl: null,
      pcimgUrl: null,
      addTeacherRules: {
        name: [{ required: true, message: '请输入教师名称', trigger: 'blur' }],
        imgUrl: [{ required: true, message: '请添加手机详情图', trigger: 'blur' }],
        listimgUrl: [{ required: true, message: '请添加手机详情图', trigger: 'blur' }],
        pcimgUrl: [{ required: true, message: '请添加pc列表图', trigger: 'blur' }],
        job: [{ required: true, message: '请输入职位', trigger: 'blur' }],
        intro: [{ required: true, message: '请输入介绍', trigger: 'blur' }]
      },
      page: 1,
      pageSize: 10,
      total: 0
    }
  },
  created () {
    this.getTeacherList()
  },
  methods: {
    getTeacherList (page = 1) {
      this.page = page
      this.listLoading = true
      api.showTeacherList({page: this.page, pageSize: this.pageSize}).then(res => {
        this.teacherList = res.data.array
        this.total = res.data.total
        this.listLoading = false
      })
    },
    // 显示新增界面
    handleAdd () {
      this.teacherType = 'add'
      this.imgUrl = null
      this.listimgUrl = null
      this.pcimgUrl = null
      this.addTeacher = {
        showId: null,
        name: null,
        imgUrl: null,
        listimgUrl: null,
        pcimgUrl: null,
        job: null,
        intro: null
      }
    },
    selsChange (sels) {
      this.sels = sels
    },
    handleAvatarSuccess (res, file) {
      this.imgUrl = file.response.data.url
      this.addTeacher.imgUrl = file.response.data.url
    },
    handleAvatarSuccess1 (res, file) {
      this.listimgUrl = file.response.data.url
      this.addTeacher.listimgUrl = file.response.data.url
    },
    handleAvatarSuccess2 (res, file) {
      this.pcimgUrl = file.response.data.url
      this.addTeacher.pcimgUrl = file.response.data.url
    },
    beforeAvatarUpload (file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isLt2M
    },
    createTeacher () {
      this.$refs.addTeacher.validate(valid => {
        if (valid) {
          this.addLoading = true
          let para = Object.assign({}, this.addTeacher)
          if (this.addTeacher.showId) {
            api.showTeacherEdit(para).then(res => {
              this.addLoading = false
              this.$notify({
                message: '修改教师成功',
                type: 'success'
              })
              this.$refs['addTeacher'].resetFields()
              this.teacherType = 'list'
              this.getTeacherList(this.page)
            })
          } else {
            api.showTeacherAdd(para).then(res => {
              this.addLoading = false
              this.$notify({
                message: '添加教师成功',
                type: 'success'
              })
              this.$refs['addTeacher'].resetFields()
              this.teacherType = 'list'
              this.getTeacherList()
            })
          }
        }
      })
    },
    goBack () {
      this.teacherType = 'list'
      this.imgUrl = null
      this.listimgUrl = null
      this.pcimgUrl = null
      this.addTeacher = {
        showId: null,
        name: null,
        imgUrl: null,
        listimgUrl: null,
        pcimgUrl: null,
        job: null,
        intro: null
      }
    },
    handleSizeChange (val) {
      this.getActivityList(val)
    },
    handleCurrentChange (val) {
      this.getActivityList(val)
    },
    delTeacher (showId) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        api.showTeacherDel({showId: showId}).then((res) => {
          this.listLoading = false
          this.getTeacherList(this.page)
        })
      }).catch(() => {})
    },

    editTeacher (item) {
      this.teacherType = 'add'
      this.imgUrl = item.imgUrl
      this.listimgUrl = item.listimgUrl
      this.pcimgUrl = item.pcimgUrl
      this.addTeacher = {
        showId: item.id,
        name: item.name,
        imgUrl: item.imgUrl,
        listimgUrl: item.listimgUrl,
        pcimgUrl: item.pcimgUrl,
        job: item.job,
        intro: item.intro
      }
    },

    changeTeacherNum (showId, num) {
      api.showTeacherNumEdit({showId: showId, num: num}).then(res => {
        if (res.status === 'succ') {
          this.$notify({
            message: '修改教师排序成功',
            type: 'success'
          })
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
}
</script>

<style scoped>
.user-img{
  width: 36px;
  height: 36px;
}
.tip{
  margin-top: 0;
  background-color: #efefef;
  padding: 0 15px;
  height: 32px;
  line-height: 32px;
  width: 400px;
}
</style>
