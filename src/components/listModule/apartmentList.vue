<template>
 <div id="app">
   <el-breadcrumb separator-class="el-icon-arrow-right"><!--面包屑导航-->
     <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
     <el-breadcrumb-item>企业管理</el-breadcrumb-item>
     <el-breadcrumb-item>部门列表</el-breadcrumb-item>
   </el-breadcrumb><!--面包屑导航结束-->
   <!--添加部门按钮-->
   <el-row style="margin-top: 15px">
     <el-button type="primary" plain size="mini" class="button" @click="dialogFormVisible = true">添加部门</el-button>
   </el-row>
   <el-table
     :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
     style="width: 100%;margin-top: 15px">
     <el-table-column
       label="部门id"
       width="180">
       <template slot-scope="scope">
         <!--<i class="el-icon-time"></i>-->
         <span style="margin-left: 10px">{{ scope.row.depart_id }}</span>
       </template>
     </el-table-column>
     <el-table-column
       label="创建日期"
       width="180">
       <template slot-scope="scope">
         <i class="el-icon-time"></i>
         <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
       </template>
     </el-table-column>
     <el-table-column
       label="部门名称"
       width="180">
       <template slot-scope="scope">
         <el-popover trigger="hover" placement="top">
           <p>姓名: {{ scope.row.depart_name }}</p>
           <p>住址: {{ scope.row.address }}</p>
           <div slot="reference" class="name-wrapper">
             <el-tag size="medium">{{ scope.row.depart_name }}</el-tag>
           </div>
         </el-popover>
       </template>
     </el-table-column>
     <el-table-column
       label="部门负责人"
       width="180">
       <template slot-scope="scope">
         <!--<i class="el-icon-time"></i>-->
         <span>{{ scope.row.managerName }}</span>
       </template>
     </el-table-column>
     <el-table-column label="操作">
       <template slot-scope="scope">
         <el-button size="mini" @click="handleEdit(scope.$index, scope.row);EditDialogFormVisible = true">编辑</el-button>
         <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
       </template>
     </el-table-column>
   </el-table>
   <!-- 添加Form -->
     <el-dialog title="添加部门" :visible.sync="dialogFormVisible" width="30%" @close="closeDialog">
       <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
         <el-form-item label="部门名称" :label-width="formLabelWidth" prop="name">
           <el-input v-model="ruleForm.name" autocomplete="off"></el-input>
         </el-form-item>
         <el-form-item label="部门地址" :label-width="formLabelWidth" prop="region">
             <el-input v-model="ruleForm.region" autocomplete="off"></el-input>
         </el-form-item>
       </el-form>
       <div slot="footer" class="dialog-footer">
         <el-button :plain="true" @click="resetForm('ruleForm');dialogFormVisible = false">取 消</el-button>
         <el-button type="primary" :plain="true" @click="submitForm('ruleForm')" >确 定</el-button>
       </div>
     </el-dialog>
   <!-- 编辑Form -->
   <el-dialog title="部门列表编辑" :visible.sync="EditDialogFormVisible" width="30%">
     <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
       <el-form-item label="部门名称" :label-width="formLabelWidth" prop="name">
         <el-input v-model="ruleForm.name" autocomplete="off"></el-input>
       </el-form-item>
       <el-form-item label="部门负责人" :label-width="formLabelWidth">
         <el-select v-model="ruleForm.person" placeholder="请选择负责人">
           <el-option label="负责人一" value="负责人一"></el-option>
           <el-option label="负责人二" value="负责人二"></el-option>
         </el-select>
       </el-form-item>
     </el-form>
     <div slot="footer" class="dialog-footer">
       <el-button :plain="true" @click="resetForm('ruleForm');EditDialogFormVisible = false">取 消</el-button>
       <el-button type="primary" :plain="true" @click="submit_Form('ruleForm')" >确 定</el-button>
     </div>
   </el-dialog>
   <!--分页按钮-->
   <el-pagination
     background
     @size-change="handleSizeChange"
     @current-change="handleCurrentChange"
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
  name:"apartmentList",
  data () {
    this.$options.methods.created(this);
    return {
      totalCount: 0,
      currentPage: 1,
      pagesize: 4,
      tableData:[],
      dialogFormVisible: false,
      EditDialogFormVisible:false,
      addName:'',
      ruleForm: {
        name: '',
        address:'',
        region:'',
        person:'',
        desc: '',
        delivery: false,
      },
      rules: {
        name: [
          { required: true, message: '请输入部门名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region:[
          { required: true, message: '请输入部门地址', trigger: 'blur' },
          { min: 3, max:50, message: '请具体到街道', type:'string',trigger: 'blur' }
        ],
        person:[
          { required: true, message: '请输入负责人', trigger: 'blur' },
          // { min: 3, max:50, message: '请具体到街道', type:'string',trigger: 'blur' }
        ],
      },
      formLabelWidth: '120px',
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },

    created(id){
      var that=id;
      // let currentPage=1;//设置当前默认在第1页
      // that.pageStatus=false;

      that.$axios.get('/department/operateApart.do')
        .then(function (resp) {
          // console.log("请求之后的回调函数执行");
          console.log(resp.data);

          // that.total=resp.data.length;//根据后台数据 得到一共有多少页

          // that.pageStatus=true;
          that.tableData=resp.data;
          that.totalCount=that.tableData.length;


          // console.log(data);
        })
    },

//============编辑传参==============

    handleEdit(index, row) {
      this.ruleForm.name=row.depart_name;
      this.ruleForm.person=row.managerName;
      this.ruleForm.Id=row.depart_id;
      // console.log(this.ruleForm.Id);
    },

//     let myId=row.depart_id;
// this.$axios.get('http://172.16.6.36:9999/manage/apartmentCtroller/deleteApart.do', {
//============删除数据==============
    handleDelete(index, row) {

      console.log(index, row);
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let myId=row.depart_id;
        this.$axios.get('/department/deleteApart.do', {
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



//============编辑数据==============
    submit_Form(ruleForm){
      this.$refs[ruleForm].validate((valid) => {
          if (valid) {
            //编辑部门表单传数据
            let editData=[this.ruleForm.Id,this.ruleForm.name,this.ruleForm.person];
            // console.log(editData);
            // console.log(this.ruleForm.Id);
            this.$axios.get('/department/editApart.do', {
              params:{
                editData
              }
            })
              .then(function (resp) {
                console.log("成功");
                // window.location.reload();
              })
              .catch(function (err) {
                console.log(err)
              });

            this.dialogFormVisible = false;
            this.EditDialogFormVisible = false;
            this.$message({
              type: 'success',
              message: '操作成功!',
            });
            this.$options.methods.created(this);
          } else {
            return false;
          }
      })
    },

//============添加部门==============
    submitForm(ruleForm) {
      let that=this;
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          //添加部门表单传数据
          let formData=[this.ruleForm.name,this.ruleForm.region];
          // console.log(that.ruleForm);
          this.$axios.get('/department/addApart.do', {
            params:{
             formData
            }
          })
            .then(function (resp) {
              console.log(resp.data);
              if(resp.data.state=="err"){

                console.log(resp.err);
              }
              if(resp.data.state=="ok"){
                console.log("添加成功");
              }
              that.ruleForm.name=undefined;
              that.ruleForm.person=undefined;

            })
          .catch(function (err) {
            console.log(err);
          });

          this.dialogFormVisible = false;
          this.EditDialogFormVisible = false;
          this.$message({
            type: 'success',
            message: '操作成功!',
          });
          this.$options.methods.created(this);
        } else {
          return false;
        }
      });

      this.$refs[ruleForm].resetFields();
    },


//============重置表单==============
    resetForm(ruleForm) {
      this.$refs[ruleForm].resetFields();
      this.$message('操作已取消');
    },
    closeDialog(done){
      this.$refs['ruleForm'].resetFields();
    }
  },
}
</script>

<style scoped>
  .button{
    /*float: right;*/
    margin-left:58%;
  }
  .el-select{
    float: left;
    width:60%;
  }
  .el-input{
    float: left;
    width:60%;
  }
  /*.el-dialog{*/
    /*width: 60%;*/
  /*}*/

</style>
