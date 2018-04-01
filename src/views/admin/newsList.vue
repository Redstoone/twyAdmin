<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px" v-if="activityType == 'list'">
      <el-button size="small" type="primary" @click="handleAddActivity">添加新闻公告</el-button>
      <el-button size="small" type="primary" @click="handleAddActivityLink">添加新闻公告链接</el-button>
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
            <p>发布时间{{item.createTime}}</p>
            <p>新闻链接: <a :href="item.link" target="view_window">{{item.link}}</a></p>
          </div>
          <div class="" v-else>
            <div class="edit-wrap">
              <span @click="delActivity(item.id)">删除</span>
              <span @click="editActivity(item)">编辑查看</span>
            </div>
            <p class="name">{{item.name}}</p>
            <p>发布时间{{item.createTime}}</p>
            <p class="desc">新闻内容：{{item.remark}}</p>
          </div>
        </li>
      </ul>
    </el-col>

    <el-col class="" :loading="listLoading" v-show="activityType != 'list'">
      <el-form :model="addActivity" label-width="100px" :rules="addActivityRules" ref="addActivity">
        <el-form-item label="名称" prop="name">
          <el-input v-model="addActivity.name" auto-complete="off" placeholder="请输入活动名称"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <!-- <el-input v-model="addActivity.content" auto-complete="off" placeholder="请输入活动内容"></el-input> -->
          <script id="ueditor" name="ueditor" type="text/plain" class="ue-content"></script>
        </el-form-item>
        <el-form-item label="视频" prop="videoUrl">
          <el-input v-model="addActivity.videoUrl" auto-complete="off" placeholder="请输入活动视频"></el-input>
        </el-form-item>
        <p class="add-tip">提示：视频请先上传到优酷等平台，然后把通用代码复制拷贝到上方</p>
        <img src="../../assets/imgs/url_help.jpg" style="width:213px;height:241px;margin-left: 100px;"/>
      </el-form>
    </el-col>

    <el-dialog title="添加新闻公告链接" :visible.sync="activityLinkVisible" :close-on-click-modal="false" width="480px">
      <el-form :model="addActivityLink" label-width="100px" :rules="addActivityLinkRules" ref="activityLink">
        <el-form-item label="名称" prop="name">
          <el-input v-model="addActivityLink.name" auto-complete="off" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="链接" prop="link">
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
        content: null,
        videoUrl: null,
        remark: null
      },
      addActivityRules: {
        name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        content: [{ required: true, message: '请输入活动内容', trigger: 'blur' }]
      }
    }
  },
  created () {
    this.getActivityList()
  },
  methods: {
    getActivityList () {
      this.listLoading = true
      api.newsList().then(res => {
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
      this.$refs.activityLink.validate(valid => {
        if (valid) {
          this.addLoading = true
          let para = Object.assign({}, this.addActivityLink)
          if (this.addActivityLink.newsId) {
            api.newsLinkEdit(para).then(res => {
              this.addLoading = false
              this.$notify({
                message: '修改新闻公告链接成功',
                type: 'success'
              })
              this.$refs['activityLink'].resetFields()
              this.activityLinkVisible = false
              this.getActivityList()
            })
          } else {
            api.newsLinkAdd(para).then(res => {
              this.addLoading = false
              this.$notify({
                message: '添加新闻公告链接成功',
                type: 'success'
              })
              this.$refs['activityLink'].resetFields()
              this.activityLinkVisible = false
              this.getActivityList()
            })
          }
        }
      })
    },

    delActivity (newsId) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        api.newsDel({newsId: newsId}).then((res) => {
          this.listLoading = false
          this.getActivityList()
        })
      }).catch(() => {})
    },
    editActivityLink (activity) {
      this.addActivityLink = {
        newsId: activity.id,
        name: activity.name,
        link: activity.link
      }
      this.activityLinkVisible = true
      this.editor.setContent(activity.content)
    },

    editActivity (activity) {
      this.addActivity = {
        newsId: activity.id,
        name: activity.name,
        content: activity.content,
        videoUrl: activity.vodeoUrl,
        remark: activity.remark
      }
      this.activityType = 'edit'
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
    createActivity () {
      this.addActivity.content = this.editor.getContent()
      this.addActivity.remark = this.editor.getContentTxt()
      this.$refs.addActivity.validate(valid => {
        if (valid) {
          this.addLoading = true
          let para = Object.assign({}, this.addActivity)
          if (this.addActivity.newsId) {
            api.newsEdit(para).then(res => {
              this.addLoading = false
              this.$notify({
                message: '修改新闻公告成功',
                type: 'success'
              })
              this.$refs['addActivity'].resetFields()
              this.activityType = 'list'
              this.getActivityList()
            })
          } else {
            api.newsAdd(para).then(res => {
              this.addLoading = false
              this.$notify({
                message: '添加新闻公告成功',
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
