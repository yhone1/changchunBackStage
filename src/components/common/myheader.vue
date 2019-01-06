<template>
  <div class="header">
    <el-row :gutter="20">
      <el-col :span="2">
        <div class="grid-content bg-purple">
          <router-link to="/"><p>changqing</p></router-link>
        </div>
      </el-col>
      <el-col :span="14">
        <div class="grid-content bg-purple"><h1>常青国际度假村后台管理系统</h1></div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple">
          <ul>
            <li>欢迎你:<span>管理员</span></li>
          </ul>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple">
          <ul>
            <li @click="exitUser">退出</li>
          </ul>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
      name: "myheader",
      data() {
        return {}
      },
      methods: {
        exitUser() {
          this.$axios.get('/exitUser.do').then(function (result) {
            window.location.href = "/login.html"
          })
        }
      }

    }
</script>

<style scoped>
  .header{
    background-color: #000;
    color: #fff;
  }
  li{
    float: left;
    list-style: none;
    padding-top:15px ;
    font-size: 18px;
    font-weight: bold;
  }
p{

  font-family: 华文行楷;
  font-size: 25px;
  color: #fff;
}
.grid-content h1{
  margin-right: 310px;
}
</style>
