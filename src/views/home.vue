<template>
  <el-row class="container">
    <el-col :span="24" class="header">
      <el-col :span="14" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
        <img src="../assets/imgs/logo.png">
        {{collapsed?'':sysName}}

        <span class="role-name">{{roleName}}</span>
        <a class="role-name" :href="'http://event.twyxedu.com/acp/sso?accesstoken=' + accesstoken" style="margin-left: 20px;" target="_blank" v-if="roleType == 'superadmin'">比赛管理</a>
      </el-col>
      <el-col :span="10" class="userinfo">
        {{sysUserName}} <div @click="logout" class="logout">退出登录</div>
      </el-col>
    </el-col>
    <el-col :span="24" class="main">
      <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
        <!--导航菜单-->
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @select="handleselect"
           unique-opened router v-show="!collapsed">
          <template v-for="(item,index) in $router.options.routes" v-if="item.type == roleType && !item.hidden">
            <el-submenu :index="index+''" v-if="!item.leaf" :key="index">
              <template slot="title">{{item.name}}</template>
              <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
            </el-submenu>
            <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path" :key="index">
              {{item.children[0].name}}
            </el-menu-item>
          </template>
        </el-menu>
        <!--导航菜单-折叠后-->
        <ul class="el-menu el-menu-vertical-demo collapsed" v-show="collapsed" ref="menuCollapsed">
          <li v-for="(item,index) in $router.options.routes" v-if="!item.hidden" class="el-submenu item" :key="index">
            <template v-if="!item.leaf">
              <div class="el-submenu__title" style="padding-left: 20px;" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)">
              </div>
              <ul class="el-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)">
                <li v-for="child in item.children" v-if="!child.hidden" :key="child.path" class="el-menu-item" style="padding-left: 40px;" :class="$route.path==child.path?'is-active':''" @click="$router.push(child.path)">{{child.name}}</li>
              </ul>
            </template>
            <template v-else>
              <li class="el-submenu">
                <div class="el-submenu__title el-menu-item" style="padding-left: 20px;height: 56px;line-height: 56px;padding: 0 20px;" :class="$route.path==item.children[0].path?'is-active':''" @click="$router.push(item.children[0].path)"><i :class="item.iconCls"></i></div>
              </li>
            </template>
          </li>
        </ul>
      </aside>
      <section class="content-container">
        <div class="grid-content bg-purple-light">
          <el-col :span="24" class="breadcrumb-container">
            <strong class="title">{{$route.name}}</strong>
          </el-col>
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
        </div>
      </section>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      sysName: '宁波天唯艺星教育',
      accesstoken: '',
      roleName: '',
      collapsed: false,
      sysUserName: '',
      sysUserAvatar: '',
      roleType: 'superadmin',
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  created () {
    let user = JSON.parse(sessionStorage.getItem('user'))
    this.accesstoken = user.accesstoken
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    handleselect (a, b) {},
    logout () {
      var _this = this
      this.$confirm('确认退出吗?', '提示', {}).then(() => {
        sessionStorage.removeItem('user')
        _this.$router.push('/login')
      }).catch(() => {})
    },
    collapse () {
      this.collapsed = !this.collapsed
    },
    showMenu (i, status) {
      this.$refs.menuCollapsed.getElementsByClassName(
        'submenu-hook-' + i
      )[0].style.display = status ? 'block' : 'none'
    }
  },
  mounted () {
    var user = sessionStorage.getItem('user')
    if (user) {
      user = JSON.parse(user)
      this.sysUserName = user.name || ''
      this.sysUserAvatar = user.avatar || ''
      this.roleType = user.role || 'superadmin'

      if (user.role === 'superadmin') {
        this.roleName = '全站管理'
      } else if (user.role === 'orgadmin') {
        this.roleName = '网点管理员'
      } else if (user.role === 'teacher') {
        this.roleName = '普通老师'
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "~scss_vars";

.container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
  .header {
    height: 60px;
    line-height: 60px;
    background: $color-primary;
    color: #fff;
    .userinfo {
      text-align: right;
      padding-right: 35px;
      float: right;
      .userinfo-inner {
        cursor: pointer;
        color: #fff;
        img {
          width: 40px;
          height: 40px;
          border-radius: 20px;
          margin: 10px 0px 10px 10px;
          float: right;
        }
      }
    }
    .logo {
      height: 60px;
      font-size: 18px;
      padding-left: 20px;
      text-align: left;
      padding-right: 20px;
      .role-name{
        font-size: 14px;
        margin-left: 50px;
      }
      img {
        width: 40px;
        float: left;
        margin: 10px 10px 10px 0;
      }
      .txt {
        color: #fff;
      }
    }
    // .logo-width {
    //   width: 230px;
    // }
    .logo-collapse-width {
      width: 60px;
    }
    .tools {
      padding: 0px 23px;
      width: 14px;
      height: 60px;
      line-height: 60px;
      cursor: pointer;
    }
  }
  .main {
    display: flex;
    position: absolute;
    top: 60px;
    bottom: 0px;
    overflow: hidden;
    aside {
      flex: 0 0 230px;
      width: 230px;
      .el-menu {
        height: 100%;
        // background-color: #2f3843;
      }
      .collapsed {
        width: 60px;
        .item {
          position: relative;
        }
        .submenu {
          position: absolute;
          top: 0px;
          left: 60px;
          z-index: 99999;
          height: auto;
          display: none;
        }
      }
    }
    .menu-collapsed {
      flex: 0 0 60px;
      width: 60px;
    }
    .menu-expanded {
      flex: 0 0 230px;
      width: 230px;
    }
    .content-container {
      flex: 1;
      overflow-y: scroll;
      padding: 20px;
      .breadcrumb-container {
        .title {
          width: 200px;
          float: left;
          color: #475669;
        }
        .breadcrumb-inner {
          float: right;
        }
      }
      .content-wrapper {
        background-color: #fff;
        box-sizing: border-box;
      }
    }
  }
}
.logout{
  cursor: pointer;
  display: inline-block;
  margin-left: 15px;
}
</style>
