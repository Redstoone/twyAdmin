<template>
  <div class="login-container">
    <el-form class="card-box login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
      <h3 class="title">后台管理系统登录</h3>

      <el-form-item prop="username">
        <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="账号" />
      </el-form-item>

      <el-form-item prop="password">
        <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" placeholder="密码" />
      </el-form-item>

      <el-button type="primary" class="btn-login" style="" :loading="loading" @click.native.prevent="handleLogin">登  录</el-button>
    </el-form>
  </div>
</template>

<script>
import api from '../../api/index.js'
export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },

      pwdType: 'password',
      loading: false,
      showDialog: false
    }
  },
  methods: {
    showPwd () {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          api.login(this.loginForm).then((res) => {
            if (res.status === 'succ') {
              this.loading = false
              let { message, code, data } = res
              if (code !== 20000) {
                this.$message({
                  message: message,
                  type: 'error'
                })
              } else {
                sessionStorage.setItem('user', JSON.stringify(data))
                if (data.role === 'superadmin') {
                  this.$router.push({ path: '/school/list' })
                } else {
                  this.$router.push({ path: '/org/setting' })
                }
              }
            } else {
              this.loading = false
              this.$notify({
                message: res.message,
                type: 'error',
                duration: 0
              })
            }
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/assets/styles/mixin.scss";

  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;

  .login-container {
    @include relative;
    height: 100vh;
    background-color: $bg;
    input:-webkit-autofill {
      box-shadow: 0 0 0px 1000px #293444 inset !important;
      -webkit-text-fill-color: #fff !important;
    }
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 44px;
    }
    .el-input {
      display: inline-block;
      height: 44px;
    }
    .el-input__inner{
      height: 44px;
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
      &_login {
        font-size: 20px;
      }
    }
    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 400px;
      padding: 35px 35px 15px 35px;
      margin: 120px auto;
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
      margin-bottom: 30px;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
    }
    .thirdparty-button {
      position: absolute;
      right: 35px;
      bottom: 28px;
    }
    .btn-login{
      width:100%;
      margin-top:20px;
      height: 48px;
    }
  }
</style>
