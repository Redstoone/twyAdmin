<template>
  <section>
    <el-col style="text-align: right;">
      <el-select v-model="course" placeholder="请选择课程" @change="courseChange">
        <el-option
          v-for="item in courseOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          >
        </el-option>
      </el-select>

      <el-select v-model="payment" placeholder="请选择支付状态" @change="paymentChange">
        <el-option
          v-for="item in payOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>

      <el-select v-model="age" placeholder="请选择年龄" @change="ageChange">
        <el-option
          v-for="item in ageOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-col>

    <el-col>
      <el-table class="ctable" :data="studentList" stripe border highlight-current-row style="width: 100%">
        <el-table-column prop="name" label="孩子姓名" width="120"></el-table-column>
        <el-table-column prop="courseName" label="课程名" width="120"></el-table-column>
        <el-table-column label="年龄/性别" width="120">
          <template slot-scope="scope">
            {{scope.row.age}} / {{scope.row.sex}}
          </template>
        </el-table-column>
        <el-table-column label="母亲姓名电话">
          <template slot-scope="scope">
            {{scope.row.momname}}<br/>{{scope.row.momphone}}
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <div class="paymethod-wrap" @click="studentPay(scope.row)">
              <div class="paymethod">{{scope.row.payMethod}}-{{scope.row.payStatus}} </div> <br />
              {{scope.row.payMethod == '微信' ? scope.row.payStatus == '已支付' ? '流水: ' : '' : '对账码: '}}
              <span style="color: #f00;">{{scope.row.payMethod == '微信' && scope.row.payStatus == '未支付' ? '' : scope.row.orderNum}}</span>
            </div>
          </template>
        </el-table-column>
          <el-table-column prop="cellphone" label="提交时间/备注查看" width="150">
          <template slot-scope="scope">
            {{scope.row.createTime}}
            <a hrefr="javascript:;" class="btn-option" size="mini" @click="viewRemark(scope.row)">查看</a>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <a href="javascript:;" class="btn-option" size="mini" @click="handleDel(scope.$index, scope.row)">删除</a>
            <a href="javascript:;" class="btn-option" size="mini" @click="handleClazz(scope.row)">分配到班</a>
          </template>
        </el-table-column>
      </el-table>
    </el-col>

    <el-dialog title="分配到班" :visible.sync="distVisible" :close-on-click-modal="false" width="480px" v-loading="loading">
      <el-form :model="addDist" :rules="addDistRules" ref="addDist">
        <el-form-item label="" prop="name">
          <el-radio-group v-model="clazzId" v-if="clazzOption.length > 0">
            <el-radio :label="item.id" v-for="(item, index) in clazzOption" :key="index">{{item.name}}</el-radio>
          </el-radio-group>
          <p style="text-align: center;" v-else>
            暂无可分配的班级
          </p>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="distVisible = false">取消</el-button>
        <el-button type="primary" @click.native="distSubmit" :loading="courseLoading">提交</el-button>
      </div>
    </el-dialog>

    <el-dialog title="查看备注" :visible.sync="remarkVisible" :close-on-click-modal="false" width="480px">
      <div style="text-align: center;">{{remark ? remark : '该用户没有填写备注'}}</div>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="remarkVisible = false">取消</el-button>
        <el-button type="primary" @click.native="remarkVisible = false" :loading="courseLoading">提交</el-button>
      </div>
    </el-dialog>

  </section>
</template>

<script>
import api from '../../api/index.js'

export default {
  name: 'Baoming',
  data () {
    return {
      studentList: [],
      distVisible: false,
      listLoading: false,
      addDist: {},
      courseLoading: false,
      addDistRules: {
        name: [{ required: true, message: '请输入课程名称', trigger: 'blur' }]
      },
      name: 1,
      remark: null,
      remarkVisible: false,
      clazzList: [],
      clazzOption: [],
      clazzId: null,
      id: null,
      courseOptions: [{
        label: '全部',
        value: null
      }],
      course: null,
      payOptions: [
        {
          label: '全部',
          value: null
        },
        {
          label: '未支付',
          value: '未支付'
        },
        {
          label: '已支付',
          value: '已支付'
        }
      ],
      payment: null,
      age: null,
      ageOptions: [
        {
          label: '全部',
          value: null
        },
        {
          label: '3-5岁',
          value: '3,5'
        },
        {
          label: '5-7岁',
          value: '5,7'
        },
        {
          label: '7-9岁',
          value: '7,9'
        },
        {
          label: '9-12岁',
          value: '9,12'
        }
      ],
      loading: false,
      courseId: null,
      payStatus: null
    }
  },
  created () {
    this.getStudentList()
    this.getCourseList()
  },
  methods: {
    getStudentList (type = 1) {
      api.orgCourseStudentList({groupId: JSON.parse(sessionStorage.getItem('groupId')), type: type, courseId: this.courseId, payStatus: this.payStatus, age: this.age}).then(res => {
        this.studentList = res.data.array
      })
    },
    getCourseList () {
      api.orgCourseList({groupId: JSON.parse(sessionStorage.getItem('groupId'))}).then(res => {
        res.data.array.forEach((item, index) => {
          this.courseOptions.push({ 'value': item.id, 'label': item.name })
        })
      })
    },
    handleClazz (row) {
      this.distVisible = true
      this.id = row.id
      this.getCourseClazz(row.courseId)
      this.loading = true
    },
    getCourseClazz (courseId) {
      this.clazzOption = []
      api.orgCourseClazz({courseId: courseId}).then(res => {
        this.loading = false
        res.data.array.forEach((item, index) => {
          this.clazzOption.push({id: item.id, name: item.name})
        })
      })
    },
    handleDel (idx, row) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        api.orgCourseStudentDel({id: row.id}).then((res) => {
          if (res.status === 'succ') {
            this.listLoading = false
            this.getStudentList()
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
    viewRemark (row) {
      this.remark = row.remark
      this.remarkVisible = true
    },
    distSubmit () {
      api.orgCourseAddClazz({id: this.id, clazzId: this.clazzId}).then(res => {
        if (res.status === 'succ') {
          this.distVisible = false
          this.$notify({
            message: '分配班级成功',
            type: 'success'
          })
          this.getStudentList()
        } else {
          this.$notify({
            message: res.message,
            type: 'error',
            duration: 0
          })
        }
      })
    },
    studentPay (row) {
      if (row.payStatus === '未支付') {
        this.$confirm('该用户状态改为已支付?', '提示', {
          type: 'warning'
        }).then(() => {
          api.studentPayStatus({id: row.id, status: '已支付'}).then(res => {
            if (res.status === 'succ') {
              this.$notify({
                message: row.name + '同学支付成功',
                type: 'success'
              })
              this.getStudentList()
            } else {
              this.$notify({
                message: res.message,
                type: 'error',
                duration: 0
              })
            }
          })
        })
      } else {
        this.$confirm('该用户已支付', '提示', {
          type: 'warning'
        }).then(() => {})
      }
    },
    courseChange (val) {
      this.courseId = val
      this.getStudentList()
    },
    paymentChange (val) {
      this.payStatus = val
      this.getStudentList()
    },
    ageChange (val) {
      this.age = val
      this.getStudentList()
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
.ctable{
  margin-top: 20px;
}
.paymethod{
  position: relative;
  padding-right: 10px;
  display: inline-block;
  cursor: pointer;
}
.paymethod:after{
  content: '';
  width: 0;
  height: 0;
  border-top: 10px solid #999;
  border-right: 4px solid transparent;
  border-left: 4px solid transparent;
  position: absolute;
  right: -5px;
  top: 5px;
}
</style>
