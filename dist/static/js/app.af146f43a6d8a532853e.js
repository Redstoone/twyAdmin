webpackJsonp([1],{GUXe:function(t,e){},JgwY:function(t,e,i){t.exports=i.p+"static/img/url_help.0a5225e.jpg"},NHnr:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i("7+uW"),a={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("transition",{attrs:{name:"fade",mode:"out-in"}},[e("router-view")],1)],1)},staticRenderFns:[]};var s=i("VU/8")({name:"App"},a,!1,function(t){i("GUXe")},null,null).exports,o=i("/ocq"),l=i("mvHQ"),r=i.n(l),d=i("mw3O"),c=i.n(d),u=i("pFYg"),m=i.n(u),p=i("//Fk"),v=i.n(p),f=i("mtWM"),g=i.n(f),h=i("zL8q"),y=i.n(h),b=function(t,e){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"GET",n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};return new v.a(function(a,s){var o={method:i,url:"http://121.196.208.151:9000"+t,headers:n&&"object"===(void 0===n?"undefined":m()(n))?n:{}};o.headers["X-Requested-Page"]="json",o["GET"===i?"params":"data"]=e,g()(o).then(function(t){a(t.data)}).catch(function(t){Object(h.Message)({message:t.message,type:"error",duration:5e3}),s(t)})})},_="application/x-www-form-urlencoded",k=function(t){return b("/api/login",c.a.stringify(t),"POST",{"Content-Type":_})},w=function(t){return b("/api/org/list","","GET")},L=function(t){return b("/api/org/add",c.a.stringify(t),"POST",{"Content-Type":_})},A=function(t){return b("/api/org/del",c.a.stringify(t),"POST",{"Content-Type":_})},F=function(t){return b("/api/org/edit",c.a.stringify(t),"POST",{"Content-Type":_})},C=function(t){return b("/api/activity/list",t,"GET")},x=function(t){return b("/api/activity/link/add",c.a.stringify(t),"POST",{"Content-Type":_})},$=function(t){return b("/api/activity/link/edit",c.a.stringify(t),"POST",{"Content-Type":_})},S=function(t){return b("/api/activity/del",c.a.stringify(t),"POST",{"Content-Type":_})},T=function(t){return b("/api/activity/add",c.a.stringify(t),"POST",{"Content-Type":_})},O=function(t){return b("/api/activity/edit",c.a.stringify(t),"POST",{"Content-Type":_})},U={name:"login",data:function(){return{loginForm:{username:"",password:""},loginRules:{username:[{required:!0,message:"请输入账号",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"}]},pwdType:"password",loading:!1,showDialog:!1}},methods:{showPwd:function(){"password"===this.pwdType?this.pwdType="":this.pwdType="password"},handleLogin:function(){var t=this;this.$refs.loginForm.validate(function(e){if(!e)return console.log("error submit!!"),!1;t.loading=!0,k(t.loginForm).then(function(e){if("succ"===e.status){t.loading=!1;var i=e.message,n=e.code,a=e.data;2e4!==n?t.$message({message:i,type:"error"}):(sessionStorage.setItem("user",r()(a)),"superadmin"===a.role?t.$router.push({path:"/school/list"}):t.$router.push({path:"/org/setting"}))}})})}}},V={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"login-container"},[i("el-form",{ref:"loginForm",staticClass:"card-box login-form",attrs:{autoComplete:"on",model:t.loginForm,rules:t.loginRules,"label-position":"left"}},[i("h3",{staticClass:"title"},[t._v("后台管理系统登录")]),t._v(" "),i("el-form-item",{attrs:{prop:"username"}},[i("el-input",{attrs:{name:"username",type:"text",autoComplete:"on",placeholder:"账号"},model:{value:t.loginForm.username,callback:function(e){t.$set(t.loginForm,"username",e)},expression:"loginForm.username"}})],1),t._v(" "),i("el-form-item",{attrs:{prop:"password"}},[i("el-input",{attrs:{name:"password",type:t.pwdType,autoComplete:"on",placeholder:"密码"},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.handleLogin(e):null}},model:{value:t.loginForm.password,callback:function(e){t.$set(t.loginForm,"password",e)},expression:"loginForm.password"}})],1),t._v(" "),i("el-button",{staticClass:"btn-login",attrs:{type:"primary",loading:t.loading},nativeOn:{click:function(e){return e.preventDefault(),t.handleLogin(e)}}},[t._v("登  录")])],1)],1)},staticRenderFns:[]};var R=i("VU/8")(U,V,!1,function(t){i("jJwW")},"data-v-17d99ac0",null).exports,q={data:function(){return{sysName:"后台管理",collapsed:!1,sysUserName:"",sysUserAvatar:"",role:"superAdmin",form:{name:"",region:"",date1:"",date2:"",delivery:!1,type:[],resource:"",desc:""}}},methods:{onSubmit:function(){console.log("submit!")},handleopen:function(){},handleclose:function(){},handleselect:function(t,e){},logout:function(){var t=this;this.$confirm("确认退出吗?","提示",{}).then(function(){sessionStorage.removeItem("user"),t.$router.push("/login")}).catch(function(){})},collapse:function(){this.collapsed=!this.collapsed},showMenu:function(t,e){this.$refs.menuCollapsed.getElementsByClassName("submenu-hook-"+t)[0].style.display=e?"block":"none"}},mounted:function(){var t=sessionStorage.getItem("user");t&&(t=JSON.parse(t),this.sysUserName=t.name||"",this.sysUserAvatar=t.avatar||"")}},N={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-row",{staticClass:"container"},[i("el-col",{staticClass:"header",attrs:{span:24}},[i("el-col",{staticClass:"logo",class:t.collapsed?"logo-collapse-width":"logo-width",attrs:{span:10}},[t._v("\n      "+t._s(t.collapsed?"":t.sysName)+"\n    ")]),t._v(" "),i("el-col",{attrs:{span:10}},[i("div",{staticClass:"tools",on:{click:function(e){return e.preventDefault(),t.collapse(e)}}},[i("i",{staticClass:"fa fa-align-justify"})])]),t._v(" "),i("el-col",{staticClass:"userinfo",attrs:{span:4}},[i("el-dropdown",{attrs:{trigger:"hover"}},[i("span",{staticClass:"el-dropdown-link userinfo-inner"},[i("img",{attrs:{src:this.sysUserAvatar}}),t._v(" "+t._s(t.sysUserName))]),t._v(" "),i("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[i("el-dropdown-item",[t._v("我的消息")]),t._v(" "),i("el-dropdown-item",[t._v("设置")]),t._v(" "),i("el-dropdown-item",{attrs:{divided:""},nativeOn:{click:function(e){return t.logout(e)}}},[t._v("退出登录")])],1)],1)],1)],1),t._v(" "),i("el-col",{staticClass:"main",attrs:{span:24}},[i("aside",{class:t.collapsed?"menu-collapsed":"menu-expanded"},[i("el-menu",{directives:[{name:"show",rawName:"v-show",value:!t.collapsed,expression:"!collapsed"}],staticClass:"el-menu-vertical-demo",attrs:{"default-active":t.$route.path,"unique-opened":"",router:""},on:{open:t.handleopen,close:t.handleclose,select:t.handleselect}},[t._l(t.$router.options.routes,function(e,n){return e.type==t.role?[e.leaf?t._e():i("el-submenu",{key:n,attrs:{index:n+""}},[i("template",{slot:"title"},[t._v(t._s(e.name))]),t._v(" "),t._l(e.children,function(e){return e.hidden?t._e():i("el-menu-item",{key:e.path,attrs:{index:e.path}},[t._v(t._s(e.name))])})],2),t._v(" "),e.leaf&&e.children.length>0?i("el-menu-item",{key:n,attrs:{index:e.children[0].path}},[t._v("\n            "+t._s(e.children[0].name)+"\n          ")]):t._e()]:t._e()})],2),t._v(" "),i("ul",{directives:[{name:"show",rawName:"v-show",value:t.collapsed,expression:"collapsed"}],ref:"menuCollapsed",staticClass:"el-menu el-menu-vertical-demo collapsed"},t._l(t.$router.options.routes,function(e,n){return e.hidden?t._e():i("li",{key:n,staticClass:"el-submenu item"},[e.leaf?[i("li",{staticClass:"el-submenu"},[i("div",{staticClass:"el-submenu__title el-menu-item",class:t.$route.path==e.children[0].path?"is-active":"",staticStyle:{"padding-left":"20px",height:"56px","line-height":"56px",padding:"0 20px"},on:{click:function(i){t.$router.push(e.children[0].path)}}},[i("i",{class:e.iconCls})])])]:[i("div",{staticClass:"el-submenu__title",staticStyle:{"padding-left":"20px"},on:{mouseover:function(e){t.showMenu(n,!0)},mouseout:function(e){t.showMenu(n,!1)}}}),t._v(" "),i("ul",{staticClass:"el-menu submenu",class:"submenu-hook-"+n,on:{mouseover:function(e){t.showMenu(n,!0)},mouseout:function(e){t.showMenu(n,!1)}}},t._l(e.children,function(e){return e.hidden?t._e():i("li",{key:e.path,staticClass:"el-menu-item",class:t.$route.path==e.path?"is-active":"",staticStyle:{"padding-left":"40px"},on:{click:function(i){t.$router.push(e.path)}}},[t._v(t._s(e.name))])}))]],2)}))],1),t._v(" "),i("section",{staticClass:"content-container"},[i("div",{staticClass:"grid-content bg-purple-light"},[i("el-col",{staticClass:"breadcrumb-container",attrs:{span:24}},[i("strong",{staticClass:"title"},[t._v(t._s(t.$route.name))])]),t._v(" "),i("el-col",{staticClass:"content-wrapper",attrs:{span:24}},[i("transition",{attrs:{name:"fade",mode:"out-in"}},[i("router-view")],1)],1)],1)])])],1)},staticRenderFns:[]};var E=i("VU/8")(q,N,!1,function(t){i("RccC")},"data-v-3d623dd6",null).exports,I=i("woOf"),P=i.n(I),j={data:function(){return{filters:{name:""},orgList:[],total:0,page:1,listLoading:!1,sels:[],editFormVisible:!1,editLoading:!1,editFormRules:{name:[{required:!0,message:"请输入姓名",trigger:"blur"}]},editForm:{name:"",address:"",telphone:null,adminname:"",password:""},addFormVisible:!1,addLoading:!1,addFormRules:{name:[{required:!0,message:"请输入网点名称",trigger:"blur"}],address:[{required:!0,message:"请输入网点地址",trigger:"blur"}],telphone:[{required:!0,message:"请输入联系电话",trigger:"blur"}],adminname:[{required:!0,message:"请输入管理员账号",trigger:"blur"}],password:[{required:!0,message:"请输入管理员密码",trigger:"blur"}]},addForm:{name:"",address:"",telphone:null,adminname:"",password:""}}},methods:{getOrgList:function(){var t=this;this.listLoading=!0,w().then(function(e){t.orgList=e.data.array,t.listLoading=!1})},handleDel:function(t,e){var i=this;this.$confirm("确认删除该记录吗?","提示",{type:"warning"}).then(function(){i.listLoading=!0,A({groupId:e.groupId}).then(function(t){i.listLoading=!1,i.getOrgList()})}).catch(function(){})},handleEdit:function(t,e){this.editFormVisible=!0,this.editForm={groupId:this.orgList[t].groupId,name:this.orgList[t].name,address:this.orgList[t].address,telphone:this.orgList[t].telphone,adminname:this.orgList[t].adminName,password:this.orgList[t].password}},handleAdd:function(){this.addFormVisible=!0},editSubmit:function(){var t=this;this.$refs.editForm.validate(function(e){if(e){t.editLoading=!0;var i=P()({},t.editForm);F(i).then(function(e){t.editLoading=!1,t.$notify({message:"修改信息成功",type:"success"}),t.$refs.editForm.resetFields(),t.editFormVisible=!1,t.getOrgList()})}})},addSubmit:function(){var t=this;this.$refs.addForm.validate(function(e){if(e){t.addLoading=!0;var i=P()({},t.addForm);L(i).then(function(e){"succ"===e.status?(t.addLoading=!1,t.$notify({message:"添加网点成功",type:"success"}),t.$refs.addForm.resetFields(),t.addFormVisible=!1,t.getOrgList()):t.$message({message:e.message,type:"error",duration:0})})}})},selsChange:function(t){this.sels=t}},mounted:function(){this.getOrgList()}},z={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("section",[i("el-col",{staticClass:"toolbar",staticStyle:{"padding-bottom":"0px"},attrs:{span:24}},[i("el-button",{attrs:{size:"small",type:"primary"},on:{click:t.handleAdd}},[t._v("添加网点")])],1),t._v(" "),i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticClass:"ctable",staticStyle:{width:"100%"},attrs:{data:t.orgList,stripe:"",border:"","highlight-current-row":""},on:{"selection-change":t.selsChange}},[i("el-table-column",{attrs:{prop:"indexOrder",label:"序号",width:"50\n    "}}),t._v(" "),i("el-table-column",{attrs:{prop:"name",label:"网点",sortable:""}}),t._v(" "),i("el-table-column",{attrs:{prop:"adminName",label:"管理员账号",sortable:""}}),t._v(" "),i("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-button",{attrs:{type:"danger",size:"small"},on:{click:function(i){t.handleDel(e.$index,e.row)}}},[t._v("删除")]),t._v(" "),i("el-button",{attrs:{size:"small"},on:{click:function(i){t.handleEdit(e.$index,e.row)}}},[t._v("信息编辑")])]}}])})],1),t._v(" "),i("el-dialog",{attrs:{title:"编辑网点",visible:t.editFormVisible,"close-on-click-modal":!1,width:"480px"},on:{"update:visible":function(e){t.editFormVisible=e}}},[i("el-form",{ref:"editForm",attrs:{model:t.editForm,"label-width":"100px",rules:t.editFormRules}},[i("el-form-item",{attrs:{label:"网点名称",prop:"name"}},[i("el-input",{attrs:{"auto-complete":"off"},model:{value:t.editForm.name,callback:function(e){t.$set(t.editForm,"name",e)},expression:"editForm.name"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"网点地址",prop:"address"}},[i("el-input",{attrs:{"auto-complete":"off"},model:{value:t.editForm.address,callback:function(e){t.$set(t.editForm,"address",e)},expression:"editForm.address"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"联系电话",prop:"telphone"}},[i("el-input",{model:{value:t.editForm.telphone,callback:function(e){t.$set(t.editForm,"telphone",e)},expression:"editForm.telphone"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"管理员账号",prop:"adminname"}},[i("el-input",{attrs:{"auto-complete":"off"},model:{value:t.editForm.adminname,callback:function(e){t.$set(t.editForm,"adminname",e)},expression:"editForm.adminname"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"管理员密码",prop:"password"}},[i("el-input",{attrs:{type:"password","auto-complete":"off"},model:{value:t.editForm.password,callback:function(e){t.$set(t.editForm,"password",e)},expression:"editForm.password"}})],1)],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{nativeOn:{click:function(e){t.editFormVisible=!1}}},[t._v("取消")]),t._v(" "),i("el-button",{attrs:{type:"primary",loading:t.editLoading},nativeOn:{click:function(e){return t.editSubmit(e)}}},[t._v("提交")])],1)],1),t._v(" "),i("el-dialog",{attrs:{title:"添加网点",visible:t.addFormVisible,"close-on-click-modal":!1,width:"480px"},on:{"update:visible":function(e){t.addFormVisible=e}}},[i("el-form",{ref:"addForm",attrs:{model:t.addForm,"label-width":"100px",rules:t.addFormRules}},[i("el-form-item",{attrs:{label:"网点名称",prop:"name"}},[i("el-input",{attrs:{"auto-complete":"off"},model:{value:t.addForm.name,callback:function(e){t.$set(t.addForm,"name",e)},expression:"addForm.name"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"网点地址",prop:"address"}},[i("el-input",{attrs:{"auto-complete":"off"},model:{value:t.addForm.address,callback:function(e){t.$set(t.addForm,"address",e)},expression:"addForm.address"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"联系电话",prop:"telphone"}},[i("el-input",{model:{value:t.addForm.telphone,callback:function(e){t.$set(t.addForm,"telphone",e)},expression:"addForm.telphone"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"管理员账号",prop:"adminname"}},[i("el-input",{attrs:{"auto-complete":"off"},model:{value:t.addForm.adminname,callback:function(e){t.$set(t.addForm,"adminname",e)},expression:"addForm.adminname"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"管理员密码",prop:"password"}},[i("el-input",{attrs:{type:"password","auto-complete":"off"},model:{value:t.addForm.password,callback:function(e){t.$set(t.addForm,"password",e)},expression:"addForm.password"}})],1)],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{nativeOn:{click:function(e){t.addFormVisible=!1}}},[t._v("取消")]),t._v(" "),i("el-button",{attrs:{type:"primary",loading:t.addLoading},nativeOn:{click:function(e){return t.addSubmit(e)}}},[t._v("保存")])],1)],1)],1)},staticRenderFns:[]};var G=i("VU/8")(j,z,!1,function(t){i("h6CG")},"data-v-2389a1ac",null).exports,M={data:function(){return{activityLinkVisible:!1,addActivityLink:{name:null,link:null},addActivityLinkRules:{name:[{required:!0,message:"请输入活动名称",trigger:"blur"}],link:[{required:!0,message:"请输入活动链接",trigger:"blur"}]},addLoading:!1,activityList:[],listLoading:!1,activityType:"list",addActivity:{name:null,time:null,address:null,content:null,videoUrl:null},addActivityRules:{name:[{required:!0,message:"请输入活动名称",trigger:"blur"}],time:[{required:!0,message:"请输入活动时间",trigger:"blur"}],address:[{required:!0,message:"请输入活动地点",trigger:"blur"}],content:[{required:!0,message:"请输入活动内容",trigger:"blur"}]}}},created:function(){this.getActivityList()},methods:{getActivityList:function(){var t=this;this.listLoading=!0,C().then(function(e){t.activityList=e.data.array,t.listLoading=!1})},handleAddActivity:function(){this.activityType="add",this.getActivityList()},handleAddActivityLink:function(){this.activityLinkVisible=!0},addActivityLinkSubmit:function(){var t=this;this.$refs.activityLink.validate(function(e){if(e){t.addLoading=!0;var i=P()({},t.addActivityLink);t.addActivityLink.activityId?$(i).then(function(e){t.addLoading=!1,t.$notify({message:"修改活动链接成功",type:"success"}),t.$refs.activityLink.resetFields(),t.activityLinkVisible=!1,t.getActivityList()}):x(i).then(function(e){t.addLoading=!1,t.$notify({message:"添加活动链接成功",type:"success"}),t.$refs.activityLink.resetFields(),t.activityLinkVisible=!1,t.getActivityList()})}})},delActivity:function(t){var e=this;this.$confirm("确认删除该记录吗?","提示",{type:"warning"}).then(function(){e.listLoading=!0,S({activityId:t}).then(function(t){e.listLoading=!1,e.getActivityList()})}).catch(function(){})},editActivityLink:function(t){this.addActivityLink={activityId:t.id,name:t.name,link:t.link},this.activityLinkVisible=!0},editActivity:function(t){this.addActivity={activityId:t.id,name:t.name,time:t.time,address:t.address,content:t.content,videoUrl:t.vodeoUrl},this.activityType="edit"},goBack:function(){this.activityType="list",this.addActivity={name:null,time:null,address:null,content:null,videoUrl:null}},createActivity:function(){var t=this;this.$refs.addActivity.validate(function(e){if(e){t.addLoading=!0;var i=P()({},t.addActivity);console.log(i),t.addActivity.activityId?O(i).then(function(e){t.addLoading=!1,t.$notify({message:"修改活动成功",type:"success"}),t.$refs.addActivity.resetFields(),t.activityType="list",t.getActivityList()}):T(i).then(function(e){t.addLoading=!1,t.$notify({message:"添加活动成功",type:"success"}),t.$refs.addActivity.resetFields(),t.activityType="list",t.getActivityList()})}})}}},J={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",["list"==t.activityType?n("el-col",{staticClass:"toolbar",staticStyle:{"padding-bottom":"0px"},attrs:{span:24}},[n("el-button",{attrs:{size:"small",type:"primary"},on:{click:t.handleAddActivity}},[t._v("添加活动")]),t._v(" "),n("el-button",{attrs:{size:"small",type:"primary"},on:{click:t.handleAddActivityLink}},[t._v("添加活动链接")])],1):n("el-col",{staticClass:"toolbar txt-right",staticStyle:{"padding-bottom":"0px"},attrs:{span:24}},[n("el-button",{attrs:{size:"small",type:"primary"},on:{click:t.goBack}},[t._v("取消返回")]),t._v(" "),n("el-button",{attrs:{size:"small",type:"primary"},on:{click:t.createActivity}},[t._v("发布")])],1),t._v(" "),"list"==t.activityType?n("el-col",{attrs:{loading:t.listLoading}},[n("ul",{staticClass:"activity-list"},t._l(t.activityList,function(e,i){return n("li",{key:i},[2==e.type?n("div",[n("div",{staticClass:"edit-wrap"},[n("span",{on:{click:function(i){t.delActivity(e.id)}}},[t._v("删除")]),t._v(" "),n("span",{on:{click:function(i){t.editActivityLink(e)}}},[t._v("编辑查看")])]),t._v(" "),n("p",{staticClass:"name"},[t._v(t._s(e.name))]),t._v(" "),n("p",[t._v("活动链接: "),n("a",{attrs:{href:e.link,target:"view_window"}},[t._v(t._s(e.link))])])]):n("div",{},[n("div",{staticClass:"edit-wrap"},[n("span",{on:{click:function(i){t.delActivity(e.id)}}},[t._v("删除")]),t._v(" "),n("span",{on:{click:function(i){t.editActivity(e)}}},[t._v("编辑查看")])]),t._v(" "),n("p",{staticClass:"name"},[t._v(t._s(e.name))]),t._v(" "),n("p",[t._v("发布时间："+t._s(e.time))]),t._v(" "),n("p",[t._v("活动地点："+t._s(e.address))]),t._v(" "),n("p",[t._v("活动内容："+t._s(e.content))])])])}))]):n("el-col",{attrs:{loading:t.listLoading}},[n("el-form",{ref:"addActivity",attrs:{model:t.addActivity,"label-width":"100px",rules:t.addActivityRules}},[n("el-form-item",{attrs:{label:"活动名称",prop:"name"}},[n("el-input",{attrs:{"auto-complete":"off",placeholder:"请输入活动名称"},model:{value:t.addActivity.name,callback:function(e){t.$set(t.addActivity,"name",e)},expression:"addActivity.name"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"活动时间",prop:"time"}},[n("el-input",{attrs:{"auto-complete":"off",placeholder:"请输入活动时间"},model:{value:t.addActivity.time,callback:function(e){t.$set(t.addActivity,"time",e)},expression:"addActivity.time"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"活动地点",prop:"address"}},[n("el-input",{attrs:{"auto-complete":"off",placeholder:"请输入活动地点"},model:{value:t.addActivity.address,callback:function(e){t.$set(t.addActivity,"address",e)},expression:"addActivity.address"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"活动内容",prop:"content"}},[n("el-input",{attrs:{"auto-complete":"off",placeholder:"请输入活动内容"},model:{value:t.addActivity.content,callback:function(e){t.$set(t.addActivity,"content",e)},expression:"addActivity.content"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"活动视频",prop:"videoUrl"}},[n("el-input",{attrs:{"auto-complete":"off",placeholder:"请输入活动视频"},model:{value:t.addActivity.videoUrl,callback:function(e){t.$set(t.addActivity,"videoUrl",e)},expression:"addActivity.videoUrl"}})],1),t._v(" "),n("p",{staticClass:"add-tip"},[t._v("提示：视频请先上传到优酷等平台，然后把通用代码复制拷贝到上方")]),t._v(" "),n("img",{staticStyle:{width:"213px",height:"241px","margin-left":"100px"},attrs:{src:i("JgwY")}})],1)],1),t._v(" "),n("el-dialog",{attrs:{title:"添加活动链接",visible:t.activityLinkVisible,"close-on-click-modal":!1,width:"480px"},on:{"update:visible":function(e){t.activityLinkVisible=e}}},[n("el-form",{ref:"activityLink",attrs:{model:t.addActivityLink,"label-width":"100px",rules:t.addActivityLinkRules}},[n("el-form-item",{attrs:{label:"活动名称",prop:"name"}},[n("el-input",{attrs:{"auto-complete":"off",placeholder:"请输入"},model:{value:t.addActivityLink.name,callback:function(e){t.$set(t.addActivityLink,"name",e)},expression:"addActivityLink.name"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"活动链接",prop:"link"}},[n("el-input",{attrs:{"auto-complete":"off",placeholder:"请输入链接"},model:{value:t.addActivityLink.link,callback:function(e){t.$set(t.addActivityLink,"link",e)},expression:"addActivityLink.link"}})],1)],1),t._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{nativeOn:{click:function(e){t.activityLinkVisible=!1}}},[t._v("取消")]),t._v(" "),n("el-button",{attrs:{type:"primary",loading:t.addLoading},nativeOn:{click:function(e){return t.addActivityLinkSubmit(e)}}},[t._v("保存")])],1)],1)],1)},staticRenderFns:[]};var D=i("VU/8")(M,J,!1,function(t){i("lvyU")},"data-v-1d909e96",null).exports,B={render:function(){var t=this.$createElement,e=this._self._c||t;return e("section",[e("el-col",{staticClass:"toolbar",staticStyle:{"padding-bottom":"0px"},attrs:{span:24}},[e("el-button",{attrs:{size:"small",type:"primary"},on:{click:this.handleAddActivity}},[this._v("添加活动")]),this._v(" "),e("el-button",{attrs:{size:"small",type:"primary"},on:{click:this.handleAddActivityLink}},[this._v("添加活动链接")])],1),this._v(" "),e("el-col",{attrs:{loading:this.listLoading}})],1)},staticRenderFns:[]};var W=i("VU/8")({data:function(){return{}}},B,!1,function(t){i("SecO")},"data-v-32d0416b",null).exports;n.default.use(o.a);var Y=new o.a({mode:"history",scrollBehavior:function(){return{y:0}},routes:[{path:"/login",name:"Login",component:R},{path:"/",component:E,name:"学校管理",iconCls:"el-icon-message",type:"superAdmin",children:[{path:"/school/list",component:G,name:"学校网点管理"}]},{path:"/",component:E,name:"活动新闻公告管理",iconCls:"el-icon-message",type:"superAdmin",children:[{path:"/activity",component:D,name:"活动编辑与发布",children:[{path:"add",component:W,name:"添加/编辑活动"},{path:"/edit/:id",component:W,name:"添加/编辑活动"}]},{path:"/news/list",component:R,name:"新闻公告管理"}]},{path:"/course",component:E,name:"课程设置",iconCls:"el-icon-message",type:"superAdmin",children:[{path:"/course/content",component:R,name:"公开课内容编辑"},{path:"/course/intro",component:R,name:"课程介绍编辑"}]},{path:"/org/setting",name:"网点设置",type:"orgAdmin",component:R},{path:"/org/teacher",name:"老师",type:"orgAdmin",component:R},{path:"/org/class",name:"班级",type:"orgAdmin",component:R},{path:"/signup",name:"微信报名学生处理",type:"orgAdmin",component:R},{path:"/",name:"微信预约体验学生处理",type:"orgAdmin",component:R}]});Y.beforeEach(function(t,e,i){"/login"===t.path&&sessionStorage.removeItem("user"),JSON.parse(sessionStorage.getItem("user"))||"/login"===t.path?i():i({path:"/login"})});var H=Y,X=i("NYxO"),Q=i("mUbh"),K=i("UjVw");n.default.use(X.a);var Z=new X.a.Store({actions:Q,getters:K,strict:!1});i("tvR6");n.default.config.productionTip=!1,n.default.use(y.a),new n.default({el:"#app",router:H,store:Z,components:{App:s},template:"<App/>"})},RccC:function(t,e){},SecO:function(t,e){},UjVw:function(t,e){},h6CG:function(t,e){},jJwW:function(t,e){},lvyU:function(t,e){},mUbh:function(t,e){},tvR6:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.af146f43a6d8a532853e.js.map