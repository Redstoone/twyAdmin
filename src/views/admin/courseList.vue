<template>
  <section>
    <el-col :span="24" class="toolbar course-toolbar" style="padding-bottom: 0px">
      <div class="course-classify">课程分类</div>
      <el-button size="small" type="primary" @click="handleAddClassify">添加分类</el-button>
    </el-col>

    <div class="classify-list">
      <div class="classify-item" v-for="(item, index) in classifyList"  v-bind:class="{ active: item.id == currentClassifyId }" :key="index" @click="handleClassify(item.id, index)">{{item.name}}</div>
    </div>

    <!--工具条-->
    <el-col :span="24" class="toolbar course-toolbar" style="padding-bottom: 0px" v-if="activityType == 'list'">
      <div class="course-classify">{{currentClassifyName}} 
        <a href="javascript:;" class="btn-classify" @click="handleDel">删除</a> / <a href="javascript:;" class="btn-classify" @click="handleEdit">重命名</a> 
      </div>
      <el-button size="small" type="primary" @click="handleAddActivity">添加课程</el-button>
      <!-- <el-button size="small" type="primary" @click="handleAddActivityLink">添加课程链接</el-button> -->
    </el-col>
    <el-col :span="24" class="toolbar txt-right" style="padding-bottom: 0px" v-else>
      <el-button size="small" type="primary" @click="goBack">取消返回</el-button>
      <el-button size="small" type="primary" @click="createActivity">保存发布</el-button>
    </el-col>

    <el-col class="" :loading="listLoading" v-show="activityType == 'list'">
      <div v-if="activityList.length > 0">
        <ul class="activity-list">
          <li v-for="(item, index) in activityList" :key="index">
            <div v-if="item.type == 2">
              <div class="edit-wrap">
                <span @click="delActivity(item.id)">删除</span>
                <span @click="editActivityLink(item)">编辑查看</span>
              </div>
              <p class="name">{{item.name}}</p>
              <p class="plink">链接: <a :href="item.link" target="view_window">{{item.link}}</a></p>
            </div>
            <div class="" v-else>
              <div class="edit-wrap">
                <span @click="delActivity(item.id)">删除</span>
                <span @click="editActivity(item)">编辑查看</span>
              </div>
              <p class="name">{{item.name}}</p>
              <p>适合年龄：{{item.age}}</p>
              <p>课时安排：{{parseInt(item.zc) > 0 ? '每学期'+item.zc+'周次' : item.zc}}，每次{{item.ksl}}课时，共{{item.sc}}分钟</p>
              <p class="desc">介绍：{{item.intro}}</p>
            </div>
            <div>
              <label class="course-lab">排序：</label>
              <el-input class="course-num teacher-num" v-model="item.num" @blur="changeCourseNum(item.id, item.num)"></el-input>
            </div>
          </li>
        </ul>
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="pageSize" layout="total, prev, pager, next" :total="total">
          </el-pagination>
        </div>
      </div>
      <div class="no-data" v-else>暂无数据</div>
    </el-col>

    <el-col class="" :loading="listLoading" v-show="activityType !== 'list'">
      <el-form :model="addActivity" label-width="100px" :rules="addActivityRules" ref="addActivity">
        <el-form-item label="课程名称" prop="name">
          <el-input v-model="addActivity.name" auto-complete="off" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="课程封面" prop="imgUrl">
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
        <el-form-item label="适合年龄" prop="age">
          <el-input v-model="addActivity.age" auto-complete="off" placeholder="请输入时间"></el-input>
        </el-form-item>
        <el-form-item label="课时安排" prop="num">
          <el-col :span="8">
            <span style="float: left;"> 每学期周次：</span>
            <el-col :span="17">
              <el-input  v-model="addActivity.zc" auto-complete="off" placeholder="请输入课时安排"></el-input>
            </el-col>
          </el-col>
          <el-col :span="8">
             <span style="float: left;"> 每次课时量：</span>
            <el-col :span="17">
              <el-input v-model="addActivity.ksl" auto-complete="off" placeholder="请输入课时安排"></el-input>
            </el-col>
          </el-col>
          <el-col :span="8">
            <span style="float: left;"> 时长：</span>
            <el-col :span="14">
              <el-input v-model="addActivity.sc" auto-complete="off" placeholder="请输入课时安排"></el-input>
            </el-col>
          </el-col>
        </el-form-item>
        <el-form-item label="内容" prop="intro">
          <el-input type="textarea" :rows="6" v-model="addActivity.intro" auto-complete="off" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="课程详情" prop="imgUrl2">
          <el-upload
            class="avatar-uploader cover-uploader"
            :action="uploadUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess2"
            :before-upload="beforeAvatarUpload">
            <img v-if="imgUrl2" :src="imgUrl2" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon cover-uploader-icon"></i>
          </el-upload>

          <a href="javascript:;" class="btn-del-img" @click="delImg" v-if="imgUrl2">删除</a>
        </el-form-item>
      </el-form>
    </el-col>

    <!--新增界面-->
    <el-dialog title="添加分类" :visible.sync="addFormVisible" :close-on-click-modal="false" width="480px">
      <el-form :model="addForm" label-width="100px" :rules="addFormRules" ref="addForm">
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="addForm.name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">保存</el-button>
      </div>
    </el-dialog>

    <!--编辑界面-->
    <el-dialog title="编辑分类" :visible.sync="editFormVisible" :close-on-click-modal="false" width="480px">
      <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="editForm.name" auto-complete="off"></el-input>
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
      editor: null,
      imgUrl: null,
      activityLinkVisible: false,
      imgUrl2: null,
      addActivityLink: {
        name: null,
        link: null,
        imgUrl: null,
        remark: null
      },
      addActivityLinkRules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        imgUrl: [{ required: true, message: '请添加封面图', trigger: 'blur' }],
        link: [{ required: true, message: '请输入链接', trigger: 'blur' }],
        remark: [{ required: true, message: '请输入描述', trigger: 'blur' }]
      },
      addLoading: false,
      activityList: [],
      listLoading: false,
      activityType: 'list',
      addActivity: {
        name: null,
        age: null,
        zc: null,
        ksl: null,
        sc: null,
        intro: null
      },
      addActivityRules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        age: [{ required: true, message: '请输入适合年龄', trigger: 'blur' }],
        zc: [{ required: true, message: '请输入地点', trigger: 'blur' }],
        ksl: [{ required: true, message: '请输入内容', trigger: 'blur' }],
        sc: [{ required: true, message: '请输入内容', trigger: 'blur' }],
        intro: [{ required: true, message: '请输入内容', trigger: 'blur' }]
      },
      uploadUrl: global.UPLOADURL,
      page: 1,
      pageSize: 10,
      total: 0,
      addFormVisible: false, // 新增界面是否显示
      addFormRules: {
        name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }]
      },
      // 新增界面数据
      addForm: {
        name: ''
      },
      classifyList: [],
      currentClassifyName: '',
      currentClassifyId: 0,
      editFormVisible: false, // 编辑界面是否显示
      editLoading: false,
      editFormRules: {
        name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }]
      },
      // 编辑界面数据
      editForm: {
        name: ''
      },
    }
  },
  created () {
    // this.getActivityList()
    this.courseClassifyList()
  },
  methods: {
    getActivityList (page = 1) {
      this.page = page
      this.listLoading = true
      api
        .courseClassifyGroup({ page: this.page, pageSize: this.pageSize, classifyId: this.currentClassifyId})
        .then(res => {
          this.activityList = res.data.array
          this.total = res.data.total
          this.listLoading = false
        })
    },
    handleAddActivity () {
      this.activityType = 'add'
      this.addActivity = {
        name: null,
        age: null,
        zc: null,
        ksl: null,
        sc: null,
        intro: null
      }
      this.imgUrl = null
      this.imgUrl2 = null
      this.addActivityLink.imgUrl2 = ''
      this.addActivity.imgUrl2 = ''
      this.$refs['addActivity'].resetFields()
    },
    handleAddActivityLink () {
      this.imgUrl = null
      this.addActivityLink = {
        name: null,
        link: null,
        imgUrl: null,
        remark: null
      }
      this.activityLinkVisible = true
    },
    addActivityLinkSubmit () {
      this.addActivityLink.imgUrl = this.imgUrl
      this.$refs.activityLink.validate(valid => {
        if (valid) {
          this.addLoading = true
          let para = Object.assign({}, this.addActivityLink)
          if (this.addActivityLink.activityId) {
            api.openCalzzLinkEdit(para).then(res => {
              if (res.status === 'succ') {
                this.addLoading = false
                this.$notify({
                  message: '修改课程链接成功',
                  type: 'success'
                })
                this.$refs['activityLink'].resetFields()
                this.activityLinkVisible = false
                this.getActivityList(this.page)
              } else {
                this.$notify({
                  message: res.message,
                  type: 'error',
                  duration: 0
                })
              }
            })
          } else {
            api.openCalzzLinkAdd(para).then(res => {
              if (res.status === 'succ') {
                this.addLoading = false
                this.$notify({
                  message: '添加课程链接成功',
                  type: 'success'
                })
                this.$refs['activityLink'].resetFields()
                this.activityLinkVisible = false
                this.getActivityList(this.page)
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

    delActivity (activityId) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        api.openCourseDel({ showId: activityId }).then(res => {
          this.listLoading = false
          this.getActivityList()
        })
      })
      .catch(() => {})
    },
    editActivityLink (activity) {
      this.addActivityLink = {
        showId: activity.id,
        name: activity.name,
        link: activity.link,
        imgUrl: activity.imgUrl,
        remark: activity.remark
      }
      this.imgUrl = activity.imgUrl
      this.addActivityLink.imgUrl = activity.imgUrl
      this.addActivity.imgUrl = activity.imgUrl
      this.activityLinkVisible = true
    },

    editActivity (activity) {
      this.addActivity = {
        showId: activity.id,
        name: activity.name,
        age: activity.age,
        ksl: activity.ksl,
        sc: activity.sc,
        zc: activity.zc,
        intro: activity.intro
      }
      this.imgUrl = activity.coverUrl
      this.addActivityLink.imgUrl = activity.coverUrl
      this.addActivity.imgUrl = activity.coverUrl
      this.imgUrl2 = activity.imgUrl
      this.addActivityLink.imgUrl2 = activity.imgUrl
      this.addActivity.imgUrl2 = activity.imgUrl
      this.activityType = 'edit'
    },

    delImg () {
      this.imgUrl2 = ''
      this.addActivityLink.imgUrl2 = ''
      this.addActivity.imgUrl2 = ''
    },

    goBack () {
      this.activityType = 'list'
      this.addActivity = {
        name: null,
        time: null,
        address: null,
        content: null,
        videoUrl: null,
        remark: null,
        imgUrl: null
      }
    },
    handleAvatarSuccess (res, file) {
      this.imgUrl = file.response
    },
    handleAvatarSuccess2 (res, file) {
      this.imgUrl2 = file.response
    },
    beforeAvatarUpload (file) {
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isLt2M
    },
    createActivity () {
      this.addActivity.coverUrl = this.imgUrl
      this.addActivity.imgUrl = this.imgUrl2
      this.$refs.addActivity.validate(valid => {
        if (valid) {
          this.addLoading = true
          let para = Object.assign({}, this.addActivity)
          para.classifyId = this.currentClassifyId
          if (this.addActivity.showId) {
            api.openCourseEdit(para).then(res => {
              this.addLoading = false
              this.$notify({
                message: '修改课程成功',
                type: 'success'
              })
              this.$refs['addActivity'].resetFields()
              this.activityType = 'list'
              this.getActivityList()
            })
          } else {
            api.openCourseAdd(para).then(res => {
              this.addLoading = false
              this.$notify({
                message: '添加课程成功',
                type: 'success'
              })
              this.$refs['addActivity'].resetFields()
              this.activityType = 'list'
              this.getActivityList()
            })
          }
        }
      })
    },

    handleSizeChange (val) {
      this.getActivityList(val)
    },
    handleCurrentChange (val) {
      this.getActivityList(val)
    },

    changeCourseNum (showId, num) {
      api.openCourseNumEdit({ showId: showId, num: num }).then(res => {
        if (res.status === 'succ') {
          this.$notify({
            message: '修改课程排序成功',
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
    },

    handleAddClassify () {
      this.addFormVisible = true
    },

    // 新增
    addSubmit () {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.addLoading = true
          let para = Object.assign({}, this.addForm)
          api.courseClassifyAdd(para).then(res => {
            if (res.status === 'succ') {
              this.addLoading = false
              this.$notify({
                message: '添加分类成功',
                type: 'success'
              })
              this.$refs['addForm'].resetFields()
              this.addFormVisible = false
              this.courseClassifyList()
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

    // 编辑
    editSubmit () {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.editLoading = true
          let para = Object.assign({}, this.editForm)
          api.courseClassifyEdit(para).then((res) => {
            this.editLoading = false
            this.$notify({
              message: '修改分类成功',
              type: 'success'
            })
            this.$refs['editForm'].resetFields()
            this.editFormVisible = false
            this.courseClassifyList();
          })
        }
      })
    },

    courseClassifyList () {
      api.courseClassifyList().then(res => {
        this.currentClassifyName = res.data.array[0].name
        this.currentClassifyId = res.data.array[0].id 
        this.classifyList = res.data.array
        this.getActivityList()
      })
    },

    handleClassify (cid, idx) {
      this.currentClassifyName = this.classifyList[idx].name
      this.currentClassifyId = this.classifyList[idx].id
      this.getActivityList()
    },

    handleEdit () {
      this.editFormVisible = true
      this.editForm = {
        name: this.currentClassifyName,
        classifyId: this.currentClassifyId
      }
    },

    handleDel () {
      let that = this
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        api.courseClassifyDel({ classifyId: this.currentClassifyId }).then(res => {
          that.listLoading = false
          that.courseClassifyList();
        })
      })
      .catch(() => {})
    }
  }
}
</script>

<style scoped>
.activity-list {
  margin: 0;
  list-style: none;
  padding-left: 0;
}
.activity-list li {
  border: 1px solid #e1e1e1;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  position: relative;
  margin-bottom: 15px;
}
.activity-list p {
  margin: 8px 0;
  font-size: 14px;
}
.activity-list .name {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}
.activity-list a {
  color: #0086e4;
  text-decoration: underline;
}
.edit-wrap {
  position: absolute;
  right: 15px;
  font-size: 14px;
  color: #0086e4;
}
.edit-wrap span {
  text-decoration: underline;
  cursor: pointer;
}
.add-tip {
  font-size: 14px;
  color: #8a8a8f;
  margin: -10px 5px 15px 100px;
}
.txt-right {
  text-align: right;
}
.desc {
  line-height: 26px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  max-height: 52px;
}
.course-num {
  display: inline-block;
  width: 80px;
}
.course-lab {
  font-size: 14px;
  font-weight: normal;
}
.btn-del-img {
  position: absolute;
  left: 140px;
  top: 28px;
  cursor: pointer;
}
.btn-del-img:hover {
  color: #f00;
}
.course-toolbar {
  position: relative;
  height: 32px;
}
.course-classify {
  font-weight: bold;
  line-height: 32px;
}
.course-toolbar .el-button {
  position: absolute;
  right: 0;
  top: 0;
}
.classify-list {
  padding-bottom: 20px;
  margin-bottom: 5px;
  border-bottom: 2px solid #e1e1e1;
}
.classify-list .classify-item{
  border-radius: 5px;
  border: 1px solid #222;
  color: #222;
  display: inline-block;
  padding: 5px 12px;
  margin-right: 5px;
  cursor: pointer;
}
.classify-list .classify-item.active{
  color: #fff !important;
  background-color: #5BBFD7 !important;
  border-color: #5BBFD7 !important; 
}
.btn-classify{
  color: #0086e4;
  font-size: 14px;
  font-weight: 400;
}
.btn-classify:hover{
  text-decoration: underline;
}
</style>
