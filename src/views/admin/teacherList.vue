<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px" v-if="teacherType == 'list'">
      <el-button size="small" type="primary" @click="handleAdd">添加老师</el-button>
    </el-col>
    <el-col :span="24" class="toolbar txt-right" style="padding-bottom: 0px" v-else>
      <el-button size="small" type="primary" @click="goBack">取消返回</el-button>
      <el-button size="small" type="primary" @click="createActivity">发布</el-button>
    </el-col>

    <!--列表-->
    <el-col :loading="listLoading" v-show="teacherType == 'list'">
      <el-table class="ctable" :data="teacherList" stripe border highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%">
        <el-table-column prop="indexOrder" label="序号" width="100">
        </el-table-column>
        <el-table-column prop="name" label="名字" sortable>
          <template slot-scope="scope">
            <span></span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <a hrefr="javascript:;" class="btn-option"  @click="handleDel(scope.$index, scope.row)">删除</a>
            <a hrefr="javascript:;" class="btn-option"  @click="handleEdit(scope.$index, scope.row)">信息编辑</a>
          </template>
        </el-table-column>
      </el-table>
    </el-col>

    <el-col :loading="listLoading" v-show="teacherType != 'list'">
      <el-form :model="addTeacher" label-width="100px" :rules="addTeacherRules" ref="addTeacher">
        <el-form-item label="名称" prop="name">
          <el-input v-model="addTeacher.name" auto-complete="off" placeholder="请输入活动名称"></el-input>
        </el-form-item>
        <el-form-item label="手机详情图" prop="imgUrl">
          <el-upload
            class="avatar-uploader cover-uploader"
            :action="uploadUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imgUrl" :src="imgUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon cover-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="手机列表图" prop="imgUrl1">
          <el-upload
            class="avatar-uploader cover-uploader"
            :action="uploadUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess1"
            :before-upload="beforeAvatarUpload">
            <img v-if="imgUrl1" :src="imgUrl1" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon cover-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="pc列表图" prop="imgUrl2">
          <el-upload
            class="avatar-uploader cover-uploader"
            :action="uploadUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess2"
            :before-upload="beforeAvatarUpload">
            <img v-if="imgUrl2" :src="imgUrl2" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon cover-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="职位" prop="post">
          <el-input type="textarea" :rows="3" v-model="addTeacher.post" auto-complete="off" placeholder="请输入职位"></el-input>
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
        imgUrl1: null,
        imgUrl2: null,
        post: null,
        intro: null
      },
      uploadUrl: global.UPLOADURL,
      imgUrl: null,
      imgUrl1: null,
      imgUrl2: null,
      addTeacherRules: {
        name: [{ required: true, message: '请输入教师名称', trigger: 'blur' }],
        imgUrl: [{ required: true, message: '请添加手机详情图', trigger: 'blur' }],
        imgUrl1: [{ required: true, message: '请添加手机详情图', trigger: 'blur' }],
        imgUrl2: [{ required: true, message: '请添加pc列表图', trigger: 'blur' }],
        post: [{ required: true, message: '请输入职位', trigger: 'blur' }],
        intro: [{ required: true, message: '请输入介绍', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 显示新增界面
    handleAdd () {
      this.teacherType = 'add'
    },
    selsChange (sels) {
      this.sels = sels
    },
    handleAvatarSuccess (res, file) {
      this.imgUrl = file.response
      this.addTeacher.imgUrl = file.response
    },
    handleAvatarSuccess1 (res, file) {
      this.imgUrl1 = file.response
      this.addTeacher.imgUrl1 = file.response
    },
    handleAvatarSuccess2 (res, file) {
      this.imgUrl2 = file.response
      this.addTeacher.imgUrl2 = file.response
    },
    beforeAvatarUpload (file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isLt2M
    },
    goBack () {
      this.teacherType = 'list'
      this.imgUrl = null
      this.imgUrl1 = null
      this.imgUrl2 = null
      this.addTeacher = {
        name: null,
        imgUrl: null,
        post: null,
        intro: null
      }
    },
  }
}
</script>

<style scoped>
</style>
