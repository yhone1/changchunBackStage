<template>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>酒店管理</el-breadcrumb-item>
      </el-breadcrumb>
      <template>
        <el-tabs v-model="activeName" @tab-click="handleClick">

          <!--房间管理部分-->
          <el-tab-pane label="房间管理" name="first">
            <roomList></roomList>
          </el-tab-pane>
          <!--房间管理部分结束-->

          <!--房型管理部分-->
          <el-tab-pane label="房型管理" name="second">
            <roomTypeStables></roomTypeStables>
          </el-tab-pane>
          <!--房型管理部分结束-->

          <!--套餐管理部分-->
          <el-tab-pane label="套餐管理" name="third">
            <listConsume></listConsume>
          </el-tab-pane>
          <!--套餐管理部分结束-->
        </el-tabs>
      </template>
      <!--<el-pagination-->
        <!--background-->
        <!--layout="prev, pager, next"-->
        <!--:total="1000">&lt;!&ndash;分页的功能&ndash;&gt;-->
      <!--</el-pagination>-->
    </div>
</template>

<script>
import roomList from '../hotelManageModule/roomList'
import roomTypeStables from '../hotelManageModule/roomTypeStables'
import listConsume from '../hotelManageModule/listConsume'
    export default {
        name: "myTabs",
      components:{
        roomList:roomList,
        roomTypeStables:roomTypeStables,
        listConsume:listConsume
      },
      data() {
        return {
          activeName: 'first'
        };
      },
      methods: {
        handleClick(tab, event) {
          console.log(tab, event);
        }
      }
    }
</script>

<style scoped>

</style>
