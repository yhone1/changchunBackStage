import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'


import listOrder from '@/components/listModule/listOrder'//订单列表
import listUser from '@/components/userList/listUser'//用户列表
import apartmentList from '@/components/listModule/apartmentList'//部门列表
import myTabs from '@/components/myTabs/myTabs'//标签选项卡
import EmployeeList from '@/components/EmployeeList/EmployeeList'//员工列表
//import login from '@/components/login/login'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path:'/myTabs',
      name:'myTabs',
      component:myTabs
    },
    {
      path:'/listUser',
      name:'listUser',
      component:listUser
    },
    {
      path:'/EmployeeList',
      name:'EmployeeList',
      component:EmployeeList
    },
    {
      path:'/apartmentList',
      name:'apartmentList',
      component:apartmentList
    },
    {
      path:'/listOrder',
      name:'listOrder',
      component:listOrder
    },
  ]
})
