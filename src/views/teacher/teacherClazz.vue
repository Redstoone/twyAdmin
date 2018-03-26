<template>
  <section>
    <el-col :span="24" class="toolbar txt-right">
      <el-button size="small" type="primary" @click="pointTo">点到</el-button>
      <el-button size="small" type="primary" @click="reportSend">发布成绩单</el-button>
    </el-col>

    <el-col>
      <div class="">
        <el-table class="ctable" :data="studentList" stripe border highlight-current-row v-loading="listLoading" style="width: 100%">
          <el-table-column prop="number" label="学号"></el-table-column>
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column label="年龄/性别">
            <template slot-scope="scope">
              {{scope.row.age}} / {{scope.row.sex}}
            </template>
          </el-table-column>
          <el-table-column label="父母名字/手机">
            <template slot-scope="scope">
              {{scope.row.momname}} ({{scope.row.momphone}}) <br />
              {{scope.row.dadname}} ({{scope.row.dadphone}})
            </template>
          </el-table-column>
          <el-table-column prop="arrive" label="点到次数"></el-table-column>
          <el-table-column label="成绩单">
            <template slot-scope="scope">
              <span>{{scope.row.reportStatus}}</span> <a hrefr="javascript:;" class="btn-option" size="mini" @click="handledistribution">查看/填写</a>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-col>
  </section>
</template>

<script>
import api from '../../api/index.js'

export default {
  name: 'Clazz',
  data () {
    return {
      clazzId: null,
      studentList: [],
      distVisible: false,
      listLoading: false,
      addDist: {},
      courseLoading: false,
      addDistRules: {
        name: [{ required: true, message: '请输入课程名称', trigger: 'blur' }]
      },
      name: 1,
      reportTime: null,
      ctable: [
        {
          name: '123',
          number: '123456'
        }
      ]
    }
  },
  created () {
    this.clazzId = this.$route.path.split('/')[2]
    this.getStudentList(this.clazzId)
  },
  methods: {
    getStudentList (clazzId) {
      api.orgStudentList({clazzId: clazzId}).then(res => {
        this.studentList = res.data.array
      })
    },

    handleDel (idx, row) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        api.orgClazzDel({clazzId: row.id}).then((res) => {
          if (res.status === 'succ') {
            this.listLoading = false
            this.getClazzList()
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
    handledistribution () {
      this.distVisible = true
    },
    pointTo () {
      window.open('/student/arrive?clazz=' + this.clazzId)
    },
    reportSend () {
      this.$confirm('确认要发送成绩单吗?', '提示', {
        type: 'warning'
      }).then(() => {
        api.studentReportSend({clazzId: this.clazzId}).then(res => {
          console.log(res)
          if (res.status === 'succ') {
            this.$notify({
              message: '发送成绩单成功',
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
      })
    }
  }
}
</script>

<style scoped>
.clazz-name{
  font-size:18px;
  color:#283040;
  margin:20px 0 10px;
  position: relative;
}
.report-title{
  font-size:18px;
  color:#000;
  text-align: center;
  margin-bottom: 20px;
}
</style>
