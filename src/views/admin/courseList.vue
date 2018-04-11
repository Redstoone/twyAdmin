<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px" v-if="activityType == 'list'">
      <el-button size="small" type="primary" @click="handleAddActivity">课程添加</el-button>
      <!-- <el-button size="small" type="primary" @click="handleAddActivityLink">添加课程链接</el-button> -->
    </el-col>
    <el-col :span="24" class="toolbar txt-right" style="padding-bottom: 0px" v-else>
      <el-button size="small" type="primary" @click="goBack">取消返回</el-button>
      <el-button size="small" type="primary" @click="createActivity">发布</el-button>
    </el-col>

    <el-col class="" :loading="listLoading" v-show="activityType == 'list'">
      <ul class="activity-list" v-if="activityList.length > 0">
        <li v-for="(item, index) in activityList" :key="index">
          <div v-if="item.type == 2">
            <div class="edit-wrap">
              <span @click="delActivity(item.id)">删除</span>
              <span @click="editActivityLink(item)">编辑查看</span>
            </div>
            <p class="name">{{item.name}}</p>
            <p>链接: <a :href="item.link" target="view_window">{{item.link}}</a></p>
          </div>
          <div class="" v-else>
            <div class="edit-wrap">
              <span @click="delActivity(item.id)">删除</span>
              <span @click="editActivity(item)">编辑查看</span>
            </div>
            <p class="name">{{item.name}}</p>
            <p>发布时间：{{item.time}}</p>
            <!-- <p>地点：{{item.address}}</p> -->
            <p class="desc">内容：{{item.remark}}</p>
          </div>
        </li>
      </ul>
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
        <el-form-item label="内容" prop="content">
          <!-- <el-input v-model="addActivity.content" auto-complete="off" placeholder="请输入内容"></el-input> -->
          <script id="ueditor" name="ueditor" type="text/plain" class="ue-content"></script>
        </el-form-item>
      </el-form>
    </el-col>

    <el-dialog title="添加链接" :visible.sync="activityLinkVisible" :close-on-click-modal="false" width="480px">
      <el-form :model="addActivityLink" label-width="100px" :rules="addActivityLinkRules" ref="activityLink">
        <el-form-item label="名称" prop="name">
          <el-input v-model="addActivityLink.name" auto-complete="off" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="封面图" prop="imgUrl">
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
        <el-form-item label="链接" prop="link">
          <el-input v-model="addActivityLink.link" auto-complete="off" placeholder="请输入链接"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="remark">
          <el-input  type="textarea" :rows="3" v-model="addActivityLink.remark" auto-complete="off" placeholder="请输入描述"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="activityLinkVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addActivityLinkSubmit" :loading="addLoading">保存</el-button>
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
      uploadUrl: global.UPLOADURL
    }
  },
  created () {
    this.getActivityList()
  },
  destroyed () {
    // this.editor.destroy()
  },
  methods: {
    getActivityList () {
      this.listLoading = true
      api.openCourseList().then(res => {
        this.activityList = res.data.array
        this.listLoading = false
      })
    },
    handleAddActivity () {
      this.activityType = 'add'
      if (!this.editor) {
        this.editor = window.UE.getEditor('ueditor')
      } else {
        let that = this
        this.editor = window.UE.getEditor('ueditor')
        this.editor.ready(() => {
          that.editor.setContent('')
        })
      }
      this.$refs['addActivity'].resetFields()
      this.getActivityList()
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
      // this.editor.setContent(activity.content)
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
                this.getActivityList()
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
                this.getActivityList()
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
        api.openCalzzDel({activityId: activityId}).then((res) => {
          this.listLoading = false
          this.getActivityList()
        })
      }).catch(() => {})
    },
    editActivityLink (activity) {
      this.addActivityLink = {
        activityId: activity.id,
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
      api.openCalzzDetail({activityId: activity.id}).then(res => {
        if (res.status === 'succ') {
          this.addActivity = {
            activityId: res.data.id,
            name: res.data.name,
            time: res.data.time,
            address: res.data.address,
            content: res.data.content,
            videoUrl: res.data.videoUrl,
            remark: res.data.remark
          }
          this.imgUrl = activity.imgUrl
          this.addActivityLink.imgUrl = activity.imgUrl
          this.addActivity.imgUrl = activity.imgUrl
          this.activityType = 'edit'
          if (!this.editor) {
            let that = this
            this.editor = window.UE.getEditor('ueditor')
            this.editor.ready(() => {
              that.editor.setContent(res.data.content)
            })
          } else {
            let that = this
            this.editor = window.UE.getEditor('ueditor')
            this.editor.ready(() => {
              that.editor.setContent(res.data.content)
            })
          }
        } else {
          this.$notify({
            message: res.message,
            type: 'error',
            duration: 0
          })
        }
      })
    },

    goBack () {
      this.activityType = 'list'
      this.addActivity = {
        name: null,
        time: null,
        address: null,
        content: null,
        videoUrl: null,
        remark: null
      }
    },
    handleAvatarSuccess (res, file) {
      this.imgUrl = file.response
    },
    beforeAvatarUpload (file) {
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    },
    createActivity () {
      this.addActivity.intro = this.editor.getContent()
      this.addActivity.remark = this.editor.getContentTxt()
      this.addActivity.coverUrl = this.imgUrl
      this.$refs.addActivity.validate(valid => {
        if (valid) {
          this.addLoading = true
          let para = Object.assign({}, this.addActivity)
          // para.content = this.editor.getContent()
          if (this.addActivity.showId) {
            api.openCalzzEdit(para).then(res => {
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
            api.openCalzzAdd(para).then(res => {
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
    }
  }
}
</script>

<style scoped>
.activity-list{
  margin: 0;
  list-style: none;
  padding-left: 0;
}
.activity-list li{
  border:1px solid #e1e1e1;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  position: relative;
  margin-bottom: 15px;
}
.activity-list p{
  margin: 8px 0;
  font-size: 14px;
}
.activity-list .name{
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}
.activity-list a{
  color:#0086e4;;
  text-decoration: underline;
}
.edit-wrap{
  position: absolute;
  right: 15px;
  font-size: 14px;
  color: #0086e4;
}
.edit-wrap span{
  text-decoration: underline;
  cursor: pointer;
}
.add-tip{
  font-size:14px;
  color:#8a8a8f;
  margin: -10px 5px 15px 100px;
}
.txt-right{
  text-align: right;
}
.desc{
  line-height: 26px;
  overflow:hidden;
  text-overflow:ellipsis;
  display:-webkit-box;
  -webkit-box-orient:vertical;
  -webkit-line-clamp:2;
  height: 52px;
}
</style>
