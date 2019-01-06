<template>
  <div id="app">
    <div class="header">
      <myheader>
      </myheader>
    </div>
    <div class="nav">
      <myNav></myNav>
    </div>
    <div class="section">
      <router-view>
      </router-view>
    </div>
    <!--<myfooter>-->
    <!--</myfooter>-->
  </div>
</template>

<script>
// import login from './components/login/login'
import myNav from './components/nav/myNav'
import myheader from './components/common/myheader'
// import myfooter from './components/common/myfooter'
export default {
  name: 'App',
  components:{
    myNav : myNav,
    myheader:myheader,
    // myfooter:myfooter,
    // login:login
  }
}
</script>

<style>
  body{
    margin:0;
    width: 100%;
    overflow-x: hidden;/*横向滚动条隐藏*/
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}
.header{
  width: 100%;
  height: 85px;
}
.section{
  padding: 20px;
  width: 70%;
  margin: 0 20% 0;
}
header h2{
  margin: 100px 0;
}
</style>
