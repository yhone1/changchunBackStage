<template>
      <el-row class="tac">
        <el-col :span="24">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-submenu index="1"><!--导航1-->
                <template slot="title"><!--主标题-->
                  <router-link to="/myTabs"><!--跳转到选项卡-->
                    <el-menu-item index="1-1">
                      <i class="el-icon-info"></i>
                      <span>酒店管理</span>
                    </el-menu-item>
                  </router-link>
                </template>
            </el-submenu>
            <el-submenu index="2"><!--导航2-->
              <template slot="title"><!--主标题-->
                <i class="el-icon-menu"></i>
                <span>企业管理</span>
              </template>
              <el-menu-item-group><!--子菜单-->
                <el-submenu index="2-1" >
                  <template slot="title" style="text-align: center">人员管理</template>
                  <router-link to="/EmployeeList"><el-menu-item index="2-1-1" >员工管理</el-menu-item></router-link>
                  <router-link to="/listUser"><el-menu-item index="2-1-2" >用户管理</el-menu-item></router-link>
                </el-submenu>
                <el-menu-item index="2-2">
                  <router-link to="/apartmentList"><el-menu-item index="2-2-1" >部门管理</el-menu-item></router-link>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="3">
              <template slot="title"><!--主标题-->
                <i class="el-icon-phone"></i>
                <span>订单管理</span>
              </template>
              <el-menu-item-group><!--子菜单-->
                <router-link to="/listOrder"><el-menu-item index="3-1" >订单列表</el-menu-item></router-link>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-row>
</template>
<script>
    export default {
      name: "myNav",
      methods: {
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        }
      }
    }
</script>

<style scoped>
.tac{
  position: absolute;
  width:20%;

}

.el-menu-item{
padding: 0 28px 0 ;
}
.el-menu{
  height: 650px;
}

   a{
    text-decoration: none;
    color: #fff;
  }
  a:visited{
   color:#ffd04b ;
  }

</style>
