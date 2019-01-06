<template>
  <div id="app">
    <el-breadcrumb separator-class="el-icon-arrow-right"><!--面包屑导航-->
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>人员管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb><!--面包屑导航结束-->


    <el-row style="margin-top: 10px"> <!--按姓名搜索开始-->
      <el-col :span="24">
        <div class="grid-content bg-purple">
          <div style="margin: 10px 0 10px 0;">
            <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
              <el-select v-model="select" slot="prepend" placeholder="请选择">
                <el-option label="用户名" value="1"></el-option>
                <el-option label="姓名" value="2"></el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
        </div>
      </el-col><!--按姓名搜索结束-->
    </el-row>

    <el-table
      :data="tableData2"
      style="width: 100%"
      :row-class-name="tableRowClassName">
      <el-table-column
        prop="userid"
        label="用户编号"
        width="150">
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户名称"
        width="150">
      </el-table-column>
      <el-table-column
        prop="realname"
        label="真实姓名"
        width="150">
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别"
        width="150">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱">
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <!--编辑-->
          <el-button size="mini" @click="dialogFormVisible = true">查看</el-button>

          <el-dialog title="用户信息详情" :visible.sync="dialogFormVisible" style="width: 70%;margin-left: 14%">
            <el-form :model="form">
              <el-form-item label="用户名称" :label-width="formLabelWidth">
                <el-input v-model="form.username" autocomplete="off" style="width: 64%"></el-input>
              </el-form-item>
              <el-form-item label="真实姓名" :label-width="formLabelWidth">
                <el-input v-model="form.realname" autocomplete="off" style="width: 64%"></el-input>
              </el-form-item>
              <el-form-item label="性别" :label-width="formLabelWidth">
                <el-select v-model="form.sex" placeholder="请选择...">
                  <el-option label="男" value="shanghai"></el-option>
                  <el-option label="女" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="邮箱" :label-width="formLabelWidth">
                <el-input v-model="form.email" autocomplete="off" style="width: 64%"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
          </el-dialog>
          <!--删除-->
          <el-button size="mini" type="danger" @click="centerDialogVisible = true">删除</el-button>
          <el-dialog
            title=""
            :visible.sync="centerDialogVisible"
            width="30%"
            center>
            <span>确定删除么？</span>
            <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
  </span>
          </el-dialog>
          <!--<el-button-->
          <!--size="mini"-->
          <!--type="danger"-->
          <!--@click="handleDelete($index, row)">删除</el-button>-->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name:"EmployeeList",
    methods: {
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
    },
    data() {
      return {
        dialogFormVisible_: false,
        dialogFormVisible: false,
        form: {
          username: '',
          realname: '',
          email: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px',
        centerDialogVisible: false,
        input: '',
        tableData2: [{
          userid: '1',
          username: '西门吹嘘',
          realname:'张三',
          sex: '男',
          email:'657885688@qq.com',
          tel:'123456897'
        },{
          userid: '1',
          username: '西门吹嘘',
          realname:'张三',
          sex: '男',
          email:'657885688@qq.com',
          tel:'123456897'
        },{
          userid: '1',
          username: '西门吹嘘',
          realname:'张三',
          sex: '男',
          email:'657885688@qq.com',
          tel:'123456897'
        },{
          userid: '1',
          username: '西门吹嘘',
          realname:'张三',
          sex: '男',
          email:'657885688@qq.com',
          tel:'123456897'
        }]
      }
    }
  }
</script>

<style scoped>
  .N{
    width: 260px;
    float: left;
    margin-top: 30px;
    margin-bottom: 30px;
  }
  .C{
    margin-top: 34px;
    margin-left: -1000px;
  }
</style>
