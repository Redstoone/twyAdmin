<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px" v-if="activityType == 'list'">
      <el-button size="small" type="primary" @click="handleAddActivity">添加活动</el-button>
      <el-button size="small" type="primary" @click="handleAddActivityLink">添加活动链接</el-button>
    </el-col>
    <el-col :span="24" class="toolbar txt-right" style="padding-bottom: 0px" v-else>
      <el-button size="small" type="primary" @click="goBack">取消返回</el-button>
      <el-button size="small" type="primary" @click="createActivity">发布</el-button>
    </el-col>

    <el-col class="" :loading="listLoading" v-show="activityType == 'list'">
      <ul class="activity-list">
        <li v-for="(item, index) in activityList" :key="index">
          <div v-if="item.type == 2">
            <div class="edit-wrap">
              <span @click="delActivity(item.id)">删除</span>
              <span @click="editActivityLink(item)">编辑查看</span>
            </div>
            <p class="name">{{item.name}}</p>
            <p>活动链接: <a :href="item.link" target="view_window">{{item.link}}</a></p>
          </div>
          <div class="" v-else>
            <div class="edit-wrap">
              <span @click="delActivity(item.id)">删除</span>
              <span @click="editActivity(item)">编辑查看</span>
            </div>
            <p class="name">{{item.name}}</p>
            <p>发布时间：{{item.time}}</p>
            <p>活动地点：{{item.address}}</p>
            <p>活动内容：{{item.content}}</p>
          </div>
        </li>
      </ul>
    </el-col>

    <el-col class="" :loading="listLoading" v-show="activityType !== 'list'">
      <el-form :model="addActivity" label-width="100px" :rules="addActivityRules" ref="addActivity">
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="addActivity.name" auto-complete="off" placeholder="请输入活动名称"></el-input>
        </el-form-item>
        <el-form-item label="活动时间" prop="time">
          <el-input v-model="addActivity.time" auto-complete="off" placeholder="请输入活动时间"></el-input>
        </el-form-item>
        <el-form-item label="活动地点" prop="address">
          <el-input v-model="addActivity.address" auto-complete="off" placeholder="请输入活动地点"></el-input>
        </el-form-item>
        <el-form-item label="活动内容" prop="content">
          <!-- <el-input v-model="addActivity.content" auto-complete="off" placeholder="请输入活动内容"></el-input> -->
          <script id="ueditor" name="ueditor" type="text/plain" class="ue-content"></script>
        </el-form-item>
        <el-form-item label="活动视频" prop="videoUrl">
          <el-input v-model="addActivity.videoUrl" auto-complete="off" placeholder="请输入活动视频"></el-input>
        </el-form-item>
        <p class="add-tip">提示：视频请先上传到优酷等平台，然后把通用代码复制拷贝到上方</p>
        <img src="../../assets/imgs/url_help.jpg" style="width:213px;height:241px;margin-left: 100px;"/>
      </el-form>
    </el-col>

    <el-dialog title="添加活动链接" :visible.sync="activityLinkVisible" :close-on-click-modal="false" width="480px">
      <el-form :model="addActivityLink" label-width="100px" :rules="addActivityLinkRules" ref="activityLink">
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="addActivityLink.name" auto-complete="off" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="活动链接" prop="link">
          <el-input v-model="addActivityLink.link" auto-complete="off" placeholder="请输入链接"></el-input>
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
      activityLinkVisible: false,
      addActivityLink: {
        name: null,
        link: null
      },
      addActivityLinkRules: {
        name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        link: [{ required: true, message: '请输入活动链接', trigger: 'blur' }]
      },
      addLoading: false,
      activityList: [],
      listLoading: false,
      activityType: 'list',
      addActivity: {
        name: null,
        time: null,
        address: null,
        content: null,
        videoUrl: null
      },
      addActivityRules: {
        name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        time: [{ required: true, message: '请输入活动时间', trigger: 'blur' }],
        address: [{ required: true, message: '请输入活动地点', trigger: 'blur' }],
        content: [{ required: true, message: '请输入活动内容', trigger: 'blur' }]
      }
    }
  },
  created () {
    this.getActivityList()
  },
  destroyed () {
    this.editor.destroy()
  },
  methods: {
    getActivityList () {
      this.listLoading = true
      api.activityList().then(res => {
        this.activityList = res.data.array
        this.listLoading = false
      })
    },
    handleAddActivity () {
      this.activityType = 'add'
      if (!this.editor) {
        this.editor = window.UE.getEditor('ueditor')
      } else {
        this.editor.setContent('')
      }
      this.$refs['addActivity'].resetFields()
      this.getActivityList()
    },
    handleAddActivityLink () {
      this.activityLinkVisible = true
    },
    addActivityLinkSubmit () {
      // this.editor.setContent(activity.content)
      this.$refs.activityLink.validate(valid => {
        if (valid) {
          this.addLoading = true
          let para = Object.assign({}, this.addActivityLink)
          if (this.addActivityLink.activityId) {
            api.activityLinkEdit(para).then(res => {
              if (res.status === 'succ') {
                this.addLoading = false
                this.$notify({
                  message: '修改活动链接成功',
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
            api.activityLinkAdd(para).then(res => {
              if (res.status === 'succ') {
                this.addLoading = false
                this.$notify({
                  message: '添加活动链接成功',
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
        api.activityDel({activityId: activityId}).then((res) => {
          this.listLoading = false
          this.getActivityList()
        })
      }).catch(() => {})
    },
    editActivityLink (activity) {
      this.addActivityLink = {
        activityId: activity.id,
        name: activity.name,
        link: activity.link
      }
      this.activityLinkVisible = true
    },

    editActivity (activity) {
      this.addActivity = {
        activityId: activity.id,
        name: activity.name,
        time: activity.time,
        address: activity.address,
        content: activity.content,
        videoUrl: activity.vodeoUrl
      }
      this.activityType = 'edit'
      this.editor.setContent(activity.content)
    },

    goBack () {
      this.activityType = 'list'
      this.addActivity = {
        name: null,
        time: null,
        address: null,
        content: null,
        videoUrl: null
      }
    },
    createActivity () {
      this.addActivity.content = this.editor.getContent()
      this.$refs.addActivity.validate(valid => {
        if (valid) {
          console.log(valid)
          this.addLoading = true
          let para = Object.assign({}, this.addActivity)
          // para.content = this.editor.getContent()
          if (this.addActivity.activityId) {
            api.activityEdit(para).then(res => {
              this.addLoading = false
              this.$notify({
                message: '修改活动成功',
                type: 'success'
              })
              this.$refs['addActivity'].resetFields()
              this.activityType = 'list'
              this.getActivityList()
            })
          } else {
            api.activityAdd(para).then(res => {
              this.addLoading = false
              this.$notify({
                message: '添加活动成功',
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
</style>
