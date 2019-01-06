<template>
    <!--<i>changqing</i>-->
  <div>
    <myheader></myheader>
    <form action="" class="login">
      <h3>{{h3}}</h3>
      <div>
        <img src="./icon/url.png" alt="" class="icon1" draggable="false">
        <input type="text" class="input1" placeholder="用户名" id="input1" @focus="focus1" @blur="blur1">>
      </div>
      <div>
        <img src="./icon/555.png" alt="" draggable="false">
        <input id="input" type="password" placeholder="密码" maxlength="16" @focus="focus" @blur="blur">
        <img draggable="false" src="./icon/kanjianmima-.png" alt="" @mousedown="xians" @mouseup="yinc">
      </div>
      <button>登录</button>
      <span>{{span}}</span>
    </form>
  </div>
</template>

<script>
  import myheader from '../common/myheader'
  export default {
        name: `login`,
    components:{
          myheader:myheader
    },
      data:function () {
        return {
          span: `忘记密码？`,
          h3:`账号登录`,
          input:`document.getElementById("input")`,
         input1:`document.getElementById("input1")`
        }
      },
    methods:{
          xians(){
            input.type="text";
          },
      yinc(){
            input.type="password";
          },
      focus(){
        input.placeholder="";
      },
      blur(){
        input.placeholder="密码";
      },
      focus1(){
        input1.placeholder="";
      },
      blur1(){
        input1.placeholder="用户名";
      }
    }
    }
</script>

<style scoped>

  img{
    width: 30px;
    height: 30px;
    position: relative;
    top: 5px;
    left: 0;
  }
  .icon1{
    width: 32px;
    height: 32px;
    left: -17px;
  }
  .input1{
    left: -17px;
  }
.login{
  padding:50px 50px 50px 50px;
  margin:0 auto;
  width: 300px;
  height: auto;
  background-color: #404a50;
  border-radius: 9px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)
}
  button{
    width: 120px;
    height: 35px;
    border: 1px rgba(220, 220, 220, 0.95) solid;
    border-radius: 50px;
    color: #d3d3d3;
    font-size: 16px;
    background-color:#404a50;
    margin-top: 30px;
    outline: none;
    cursor: pointer;
    /*box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2)*/

  }
  h3{
    color: #f4f4f4;
    font-weight: lighter;
    margin-left: -70%;

  }
  span{
    margin-left: 30%;
    border-bottom: 1px rgba(238, 238, 238, 0.78) solid;
    cursor: pointer;
    color: rgba(227, 227, 227, 0.83);

  }
  input{
    width: 200px;
    max-height: 30px;
    border: none;
    background:none;
    outline: none;
    position: relative;
    font-size: 16px;
    top: -5px;
    left: 0;
  }
div{
  Max-width: 100%;
  height: auto;
  border: 1px rgba(0, 0, 0, 0.6) solid;
  border-radius: 5px;
  margin-top: 30px;
}
  input::-webkit-input-placeholder {
          /* placeholder颜色  */
    color: #cdd5e0;
           /* placeholder字体大小  */
    font-size: 16px;
          /* placeholder位置  */
    text-align: left;
        }
  i{
    font-size: 40px;
    font-family: 华文行楷;
    color: white;
  }
</style>
