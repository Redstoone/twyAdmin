<template>
  <section>
    <el-col :span="24" class="toolbar txt-right">
      <el-button size="small" type="primary" @click="goBack">查看课程设置</el-button>
      <el-button size="small" type="primary" @click="exportStudent">点到</el-button>
      <el-button size="small" type="primary" @click="reportCardVisible = true">发布成绩单</el-button>
    </el-col>

    <el-col>
      <div class="">
        <el-table class="ctable" :data="studentList" stripe border highlight-current-row v-loading="listLoading" style="width: 100%">
          <el-table-column prop="name" label="学号"></el-table-column>
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column label="年龄/性别">
            <template slot-scope="scope">
              {{scope.row.age}} / {{scope.row.sex}}
            </template>
          </el-table-column>
          <el-table-column label="父母名字/手机" sortable>
            <template slot-scope="scope">
              {{scope.row.momname}} ({{scope.row.momphone}}) <br />
              {{scope.row.dadname}} ({{scope.row.dadphone}})
            </template>
          </el-table-column>
          <el-table-column prop="cellphone" label="点到次数" sortable>
            <template slot-scope="scope">
              {{scope.row.time}},{{scope.row.duration}}
            </template>
          </el-table-column>
          <el-table-column label="成绩单">
            <template slot-scope="scope">
              <span>已完成</span> <a hrefr="javascript:;" class="btn-option" size="mini" @click="handledistribution">查看/填写</a>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-col>

    <el-col class="sign-wrap">
      <div class=""></div>
      <el-table class="ctable" >
        <el-table-column prop="name" label="学号"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
         <el-table-column prop="name" label="操作">
           <template slot-scope="scope">
              <div class="" v-for="(item, index) in [0, 2, 1]" :key="index">
                <div @click="btnSing(item, scope.row)" class="sign-item" :class="['item'+item]"></div>
              </div>
            </template>
         </el-table-column>
      </el-table>
    </el-col>

    <el-dialog title="发布成绩单" :visible.sync="reportCardVisible" :close-on-click-modal="false" width="480px">
      <div class="report-title">*芭蕾舞A班-成绩单</div>
      <el-form :model="addDist" label-width="100px" ref="addDist">
        <el-form-item label="发送时间：">
          <el-date-picker
            v-model="reportTime"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="reportCardVisible = false">取消</el-button>
        <el-button type="primary" @click.native="reportCardSubmit" :loading="courseLoading">提交</el-button>
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
      reportCardVisible: false,
      reportTime: null,
      ctable: [
        {
          name: '123',
          number: '123456'
        }
      ]
    }
  },
  methods: {
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
    reportCardSubmit () {
      console.log(this.reportTime)
      this.reportCardVisible = false
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
