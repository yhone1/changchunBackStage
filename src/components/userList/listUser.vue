<template>
  <div id="app">
    <el-breadcrumb separator-class="el-icon-arrow-right"><!--面包屑导航-->
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>人员管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb><!--面包屑导航结束-->
    <el-row>
      <el-input v-model="input" placeholder="姓名" class="N"></el-input>
      <el-button type="primary" class="C" size="small" @click="searchUser()">查询</el-button>
    </el-row>
    <el-table
      :data="tableData2.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      style="width: 100%"
      :row-class-name="tableRowClassName">
      <el-table-column
        prop="user_id"
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
          <el-button size="mini" @click="cheackInfo(scope.$index,scope.row);dialogFormVisible = true">查看</el-button>

          <el-dialog title="用户信息详情" :visible.sync="dialogFormVisible" style="width: 70%;margin-left: 14%">
            <el-form :model="form">
              <el-form-item label="用户名称" :label-width="formLabelWidth">
                <el-input v-model="form.username" autocomplete="off" style="width: 64%" readonly=""></el-input>
              </el-form-item>
              <el-form-item label="真实姓名" :label-width="formLabelWidth">
                <el-input v-model="form.realname" autocomplete="off" style="width: 64%" readonly=""></el-input>
              </el-form-item>
              <el-form-item label="性别" :label-width="formLabelWidth">
                <el-select v-model="form.sex" placeholder="请选择..." aria-readonly="">
                  <el-option label="男" value="男"></el-option>
                  <el-option label="女" value="女"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="邮箱" :label-width="formLabelWidth">
                <el-input v-model="form.email" autocomplete="off" style="width: 64%" readonly=""></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
          </el-dialog>
          <!--删除-->
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index,scope.row);centerDialogVisible = true">删除</el-button>
          <!--<el-dialog-->
            <!--title=""-->
            <!--:visible.sync="centerDialogVisible"-->
            <!--width="30%"-->
            <!--center>-->
            <!--<span>确定删除么？</span>-->
            <!--<span slot="footer" class="dialog-footer">-->
    <!--<el-button @click="centerDialogVisible = false">取 消</el-button>-->
    <!--<el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>-->
  <!--</span>-->
          <!--</el-dialog>-->
          <!--<el-button-->
          <!--size="mini"-->
          <!--type="danger"-->
          <!--@click="handleDelete($index, row)">删除</el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @size-change="handleSizeChange_"
      @current-change="handleCurrentChange_"
      :pager-count="5"
      :current-page.sync="currentPage"
      :page-size="pagesize"
      prev-text="<"
      next-text=">"
      layout="total, prev, pager, next"
      :total="totalCount"
      style="position: fixed;left: 66%;top: 500px;">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name:"listUser",
    data() {
      this.$options.methods.created(this);
      return {
        totalCount: 0,
        currentPage: 1,
        pagesize: 4,
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
        tableData2: []
      }
    },
    methods: {
      handleSizeChange_(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange_(val) {
        console.log(`当前页: ${val}`);
      },
      created(id){
        // console.log("哈哈哈哈哈哈哈哈哈哈哈哈哈");
        var that=id;
        that.$axios.get('/user/queryUser.do')
          .then(function (resp) {
            // console.log(resp.data);
            that.tableData2=resp.data;
            that.totalCount=that.tableData2.length;
          })
      },
      tableRowClassName(){

      },
    //==============查看=============
      cheackInfo(index,row){
        this.form.username=row.username;
        this.form.realname=row.realname;
        this.form.sex=row.sex;
        this.form.email=row.email;
      },
      //===================删除================
      handleDelete(index, row) {
        // console.log(row.user_id);
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let myId=row.user_id;
          this.$axios.get('/user/deleteUser.do', {
            params:{
              myId
            }
          })
            .then(function (resp) {
              console.log("成功");
            })
            .catch(function (err) {
              console.log(err)
            });
          this.$options.methods.created(this);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },
      //===================查询================
      searchUser(){
        let searchName=this.input;
        console.log(searchName);
        let that=this;
        that.$axios.get('/user/searchUser.do',{
          params:{
            searchName
          }
        })
          .then(function (resp) {
            console.log(resp.data);
            that.tableData2=resp.data;

          })
          .catch(function (err) {
          console.log(err)
        });
      }
    },

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
    margin-left: -600px;
  }
</style>
