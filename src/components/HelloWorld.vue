<template>
  <div class="hello">

    <!--<myNav></myNav>-->
    <h1>{{ msg }}</h1>
    <img src="../../static/images/16_110958_14_115619_Winter+Package+FIT+nS.jpg" alt="">
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  // components:{
  //   myNav:myNav
  // },
  data () {
    return {
      msg: 'Welcome to Your ChangQing app'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
  font-size: 45px;
  /*line-height: 45px;*/
}
ul {
  list-style-type: none;
  padding: 0;
}
img{
  margin: -20px;
  /*margin-top: -15px;*/
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
