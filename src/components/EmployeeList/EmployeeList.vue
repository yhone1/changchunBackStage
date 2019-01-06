<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right"><!--面包屑导航-->
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>人员管理</el-breadcrumb-item>
      <el-breadcrumb-item>员工列表</el-breadcrumb-item>
    </el-breadcrumb><!--面包屑导航结束-->

<!--================搜索查询====================-->
    <el-row style="margin-top: 10px"> <!--按姓名搜索开始-->
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <div style="margin: 10px 0 10px 0;">
            <el-input placeholder="请输入内容" v-model="input" class="input-with-select" @keyup.enter.native="searchBtn">
              <el-select v-model="select" slot="prepend" placeholder="请选择">
                <el-option label="姓名" value="employee_name"></el-option>
                <el-option label="编号" value="employee_id"></el-option>
                <el-option label="职位" value="position"></el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search" @click.native="searchBtn"></el-button>
            </el-input>
          </div>
        </div>
      </el-col><!--按姓名搜索结束-->

      <el-col :span="12"> <!--新增开始-->
        <div class="grid-content bg-purple-light">
          <el-button type="primary" class="X" size="small" @click="dialogFormVisible_ = true">新增</el-button>
        </div>
      </el-col><!--新增结束-->
    </el-row>

<!--===================表格=========================-->
    <el-table
      :data="tableData2.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      style="width: 100%"
      :row-class-name="tableRowClassName">
      <el-table-column
        prop="employee_id"
        label="员工编号"
        width="100">
      </el-table-column>
      <el-table-column
        prop="employee_name"
        label="姓名"
        width="100">
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别"
        width="100">
      </el-table-column>
      <el-table-column
        prop="hotel"
        label="所属酒店"
        width="100">
      </el-table-column>
      <el-table-column
        prop="depart_name"
        label="部门">
      </el-table-column>
      <el-table-column
        prop="position"
        label="职位">
      </el-table-column>
      <el-table-column
        prop="tel"
        label="联系方式"
        width="180">
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <!--编辑-->
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row);dialogFormVisible = true">编辑</el-button>
          <!--删除-->
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row);centerDialogVisible = true">删除</el-button>

        </template>
      </el-table-column>
    </el-table>

<!--=================新增弹框=======================-->
    <el-dialog title="" :visible.sync="dialogFormVisible_" style="width: 70%;margin-left: 10%">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="员工名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off" style="width: 60%" ></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-select v-model="form.sex" placeholder="请选择..." prop="sex" >
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职能部门" :label-width="formLabelWidth">
          <el-select v-model="form.depart" placeholder="请选择..." prop="depart">
            <el-option label="财务部" value="财政部"></el-option>
            <el-option label="管理部" value="管理部"></el-option>
            <el-option label="后勤部" value="后勤部"></el-option>
            <el-option label="外勤部" value="外勤部"></el-option>
            <el-option label="内勤部" value="内勤部"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系方式" :label-width="formLabelWidth" prop="tel">
          <el-input v-model="form.tel" autocomplete="off" style="width: 60%"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('form');dialogFormVisible_ = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('form');dialogFormVisible_ = false">立即创建</el-button>
      </div>
    </el-dialog>

<!--==================编辑弹框=======================-->
    <el-dialog title="员工列表编辑" :visible.sync="dialogFormVisible" style="width: 70%;margin-left: 14%">
      <el-form :model="form"  ref="form">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" style="width: 64%"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-select v-model="form.sex" placeholder="请选择...">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="绑定酒店" :label-width="formLabelWidth">
          <el-select v-model="form.hotel" placeholder="请选择...">
            <el-option label="常青谷" value="常青谷"></el-option>
            <el-option label="常青堡" value="常青堡"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门" :label-width="formLabelWidth">
          <el-select v-model="form.depart" placeholder="请选择...">
            <el-option label="外勤部" value="外勤部"></el-option>
            <el-option label="内勤部" value="内勤部"></el-option>
            <el-option label="服务部" value="服务部"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职位" :label-width="formLabelWidth">
          <el-select v-model="form.position" placeholder="请选择...">
            <el-option label="内勤服务生" value="内勤服务生"></el-option>
            <el-option label="外勤服务生" value="外勤服务生"></el-option>
            <el-option label="大堂服务生" value="大堂服务生"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系方式" :label-width="formLabelWidth">
          <el-input v-model="form.tel" autocomplete="off" style="width: 64%"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit_Form('form');dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <!--分页按钮-->
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
    name:"EmployeeList",
    data() {
      this.$options.methods.created(this);
      return {
        totalCount: 0,
        currentPage: 1,
        pagesize: 4,
        tableData2: [],
        dialogFormVisible_: false,
        dialogFormVisible: false,
        form: {
          name: '',
          sex:'',
          depart:'',
          tel:'',

          region: '',
          position:'',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        rules:{
          name: [
            { required: true, message: '请输入员工名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
          ],
          sex: [
            { required: true, message: '请输入员工名称', trigger: 'blur' },
            { min: 3, max: 5, message: '请选择', trigger: 'blur' }
          ],
          depart:[
            { required: true, message: '请输入员工名称', trigger: 'blur' },
            { min: 3, max: 5, message: '请选择', trigger: 'blur' }
          ],
          tel:[
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { min:11,max:11, message: '请输入正确的手机号', trigger: 'blur' }
          ],
        },
        formLabelWidth: '120px',
        centerDialogVisible: false,
        input: '',
        select:'',

      }
    },

    methods: {
      //=================================================三条件搜索框====================
      searchBtn(){
        let that=this;
        console.log(this.select);//获取条件选择的value值
        console.log(this.input);//获取输入框的值
        let mysel=[this.select,this.input];
        this.$axios.get('/staff/mysearchBtn.do', {
              params:{
                mysel
              }
            })
              .then(function (resp) {
                console.log("后台返回的值=="+resp.data[0]);
                console.log(resp.data[0]);
                console.log(resp.data);
                console.log(resp.data[0].employee_id);
                //====================================还有一个BUG======================================
                // let mypass=JSON.stringify(resp.data);
// console.log(mypass[0]+mypass[1]);
//                 that.tableData2=JSON.stringify(mypass);
                that.tableData2=resp.data[0];//数据成功传输过来
                that.totalCount=[that.tableData2].length;
                // that.totalCount=10;
                console.log(that.tableData2);
                console.log(that.totalCount);
              });
      },

      handleSizeChange_(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange_(val) {
        console.log(`当前页: ${val}`);
      },
      created(id){
        var that=id;
        that.$axios.get('/staff/queryStaff.do')
          .then(function (resp) {
            console.log(resp.data);
            that.tableData2=resp.data;
            that.totalCount=that.tableData2.length;
          })
      },

      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },

      //删除
      handleDelete(index, row) {
        console.log(index, row);
        console.log("我的=="+ row.employee_id);
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let myId=row.employee_id;
          this.$axios.get('/staff/deleteStaff.do', {
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

      //新增
      submitForm(form) {
        console.log(this.form);
        let myform=this.form;
        let that=this;
        this.$refs[form].validate((valid) => {
          if (valid) {
            //添加部门表单传数据
            // let formData=[this.ruleForm.name,this.ruleForm.region];
            // // console.log(that.ruleForm);
            // this.$axios.get('http://172.16.6.36:9999/manage/apartmentCtroller/addApart.do', {
            //   params:{
            //     formData
            //   }
            // })
            //   .then(function (resp) {
            //     console.log(resp.data);
            //     if(resp.data.state=="err"){
            //
            //       console.log(resp.err);
            //     }
            //     if(resp.data.state=="ok"){
            //       console.log("添加成功");
            //     }
            //     that.ruleForm.name=undefined;
            //     that.ruleForm.person=undefined;
            //
            //   })
            //   .catch(function (err) {
            //     console.log(err);
            //   });
            // let newadd=[this.Form.name,this.Form.sex,this.Form.depart,this.Form.tel];

            // console.log(newadd);
            this.$axios.get('/staff/addStaff.do', {
              params:{
                myform
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

            this.dialogFormVisible_ = false;
            // this.EditDialogFormVisible = false;
            this.$message({
              type: 'success',
              message: '操作成功!',
            });
            this.$options.methods.created(this);
          } else {
            return false;
          }
        });

        // this.$refs[ruleForm].resetFields();
      },

    //  编辑
      handleEdit(index,row){
        this.form.name=row.employee_name;
        this.form.sex=row.sex;
        this.form.hotel=row.hotel;

        this.form.depart=row.depart_name;
        this.form.position=row.position;
        this.form.tel=row.tel;
        this.form.id=row.employee_id;
      },
      submit_Form(form){
        this.$refs[form].validate((valid) => {
          if (valid) {
            //编辑部门表单传数据
            let editData=this.form;
            console.log(editData);
            this.$axios.get('/staff/editStaff.do', {
              params:{
                editData
              }
            })
              .then(function (resp) {
                console.log(resp.data)
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

          } else {
            return false;
          }
        })
      }

    },
  }
</script>

<style scoped>
  .X{
    position: absolute;
    top: 30%;
    left: 80%;
    background-color: snow;
    color: rgba(43, 43, 43, 0.93);
  }
  .el-select,.el-input{
    /*float:left;*/
    width: 80%;
    /*margin-left: 5%;*/
  }

</style>
