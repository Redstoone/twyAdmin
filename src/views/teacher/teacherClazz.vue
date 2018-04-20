<template>
  <section>
    <el-col :span="24" class="toolbar txt-right" style="position: relative;">
      <el-select v-model="classId" placeholder="请选择班级" @change="changeClazz" style="position: absolute; left: 0; bottom: 0;">
        <el-option
          v-for="item in teacherClazzList"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <el-button size="small" type="primary" @click="pointTo">点到</el-button>
      <!-- <el-button size="small" type="primary" @click="reportSend">发布成绩单</el-button> -->
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
              <span v-if="scope.row.dadname">{{scope.row.dadname}} ({{scope.row.dadphone}})</span>
            </template>
          </el-table-column>
          <el-table-column prop="arrive" label="点到次数">
          </el-table-column>
          <el-table-column label="成绩单">
            <template slot-scope="scope">
              <span>{{scope.row.reportStatus}}</span> <a hrefr="javascript:;" class="btn-option" size="mini" @click="handleReoprt(scope.row)">查看/填写</a>
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
      ctable: [],
      teacherClazzList: [],
      classId: null
    }
  },
  created () {
    // this.clazzId = this.$route.path.split('/')[2]
    // this.getStudentList(this.clazzId)
    console.log(JSON.parse(sessionStorage.getItem('user')))
    this.getClazzList(JSON.parse(sessionStorage.getItem('user')).id)
  },
  mounted  () {
    document.querySelector('.menu-expanded').style.display = 'none'
  },
  methods: {
    getClazzList (teacherId) {
      api.teacherClazz({teacherId: teacherId}).then(res => {
        if (res.status === 'succ') {
          this.teacherClazzList = res.data.array
          this.classId = res.data.array.length > 0 ? res.data.array[0].id : null
          if (this.classId) {
            this.getStudentList(this.classId)
          }
        }
      })
    },

    changeClazz (val) {
      this.getStudentList(this.classId)
    },
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
    handleReoprt (row) {
      this.distVisible = true
      window.open('/student/report?sid=' + row.studentId)
    },
    pointTo () {
      window.open('/student/arrive?clazz=' + this.classId + '&name=' + document.querySelector('.title').innerText)
    },
    reportSend () {
      this.$confirm('确认要发送成绩单吗?', '提示', {
        type: 'warning'
      }).then(() => {
        api.studentReportSend({clazzId: this.clazzId}).then(res => {
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
