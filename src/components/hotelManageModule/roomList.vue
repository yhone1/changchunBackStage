<template>
  <!--房间列表-->
  <div class="roomList">

    <!--表头-->
    <el-row type="flex" :gutter="15">
     <el-form :model="Roomform" ref="Roomform">
        <!--房间搜索-->
      <el-col :xs="4" :sm="5" :md="6" :lg="7" :xl="8">
        <div class="grid-content bg-purple">
          <el-input v-model="Roomform.input1" class="input" placeholder="房间号"></el-input>
        </div>
      </el-col>
      <!--查询按钮-->
      <el-col :xs="2" :sm="2" :md="2" :lg="3" :xl="4">
        <div class="grid-content bg-purple">
          <el-button type="primary" plain  @click="newRoom">查询</el-button>
        </div>
      </el-col>
      <!--新增按钮-->
      <el-col :xs="2" :sm="2" :md="2" :lg="3" :xl="4" :offset="9">
        <div class="grid-content bg-purple">
          <el-button type="primary" @click="dialogVisible = true">新增</el-button>
        </div>
      </el-col>
     </el-form>
    </el-row>
    <br>
    <br>
    <br>
    <!--表头-->
    <el-table :data="roomtableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"  style="width: 100%">
        <el-table-column prop="order_id" label="房间号" width="180">
        </el-table-column>
        <el-table-column prop="door_hao" label="类型名称" width="180">
        </el-table-column>
        <el-table-column prop="room_type_id" label="酒店名称">
        </el-table-column>
        <el-table-column prop="room_state" label="状态">
        </el-table-column>
        <el-table-column prop="isactive" label="是否激活">
        </el-table-column>
      <!--按钮-->
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <template>
              <el-button type="primary" size="mini" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
            </template>
            <template>
              <el-button type="danger" size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </template>
        </el-table-column>
    </el-table>
    <!--编辑弹框-->
    <el-dialog title="房间列表编辑" :visible.sync="dialogFormVisible">
      <el-form :model="Roomform" ref="Roomform">
        <!--酒店名称、默认-->
        <el-form-item label="酒店名称" :label-width="formLabelWidth">
          <el-select v-model="Roomform.room_type_id" placeholder="常青谷">
          </el-select>
        </el-form-item>
        <!--房间类型，默认-->
        <el-form-item  label="房间类型" :label-width="formLabelWidth">
          <el-select  v-model="Roomform.door_hao" placeholder="夯土小屋">
          </el-select>
        </el-form-item>
        <!--状态-->
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-select v-model="Roomform.room_state" placeholder="请选择">
            <el-option label="租出" value="0"></el-option>
            <el-option label="空闲" value="1"></el-option>
            <el-option label="维护" value="2"></el-option>
          </el-select>
        </el-form-item>
        <!--激活-->
        <el-form-item label="是否激活" :label-width="formLabelWidth">
          <el-select v-model="Roomform.isactive" placeholder="请选择">
            <el-option label="是" value="3"></el-option>
            <el-option label="否" value="4"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!--按钮-->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit_Form('Roomform')">确 定</el-button>
      </div>
    </el-dialog>
    <!--新增房间-->
    <el-dialog title="新增房间" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
      <el-form :model="Roomform"  ref="Roomform">
      <!--固定的房间类型-->
        <el-row>
          <el-col :span="8">
            <div class="grid-content bg-purple-dark">
              <h4>房间类型--</h4>
            </div>
          </el-col>
          <el-col :span="10">
            <div class="grid-content bg-purple-dark">
              <br>
              <template>
                <!--下拉框-->
                <el-select v-model="Roomform.value1" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </template>
            </div>
          </el-col>
        </el-row>
        <!--房间号-->
        <el-row>
          <el-col :span="8">
              <div class="grid-content bg-purple-dark">
                <h4>房间号：</h4>
              </div>
            </el-col>
          <el-col :span="10">
              <br>
              <div class="grid-content bg-purple-dark">
               <el-input v-model="Roomform.input" placeholder="请输房间号">
               </el-input>
              </div>
            </el-col>
        </el-row>
        <!--按钮-->
        <br>
        <br>
        <el-row>
          <el-col :span="12" :offset="7">
            <div class="grid-content bg-purple-dark">
              <span  class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm('form')">确认创建</el-button>
              </span>
            </div></el-col>
        </el-row>
      </el-form>
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
  let options= [{
      value: '夯土小屋',
      label: '夯土小屋'
    }, {
      value: '夯土小屋双人',
      label: '夯土小屋双人'
    }, {
      value: '树顶别墅双人',
      label: '树顶别墅双人'
    }, {
      value: '树顶别墅三人',
      label: '树顶别墅三人'
    }];
  export default {
    name: `roomList`,

      data() {
        this.$options.methods.created(this);
        return {
          totalCount: 0,
          currentPage: 1,
          pagesize: 4,
          input:'',
          dialogVisible: false,
          roomtableData:[],
          options:options,
           dialogTableVisible: false,
          dialogFormVisible: false,
          Roomform: {
            room_type_id:'',
            door_hao: '',
            room_state:'',
            isactive: '',
            input:'',
            value1:'',
            input1:'',
            order_id,
          },
          formLabelWidth: '120px',
        }
      },
      methods:{
        handleClose(){},
        handleclose(){},
        //获取页面的数据
        created(id){
          id.$axios.get('/room/roomInformation.do')
            .then(function (resp) {
              // console.log("2222222");
              id.roomtableData=resp.data;
              // console.log(resp.data)
            });
        },
        //编辑弹框里面的参数
        handleEdit(index, row) {
          console.log(row);
          this.dialogFormVisible=true;
          this.Roomform.room_type_id=row.room_type_id;
          this.Roomform.door_hao=row.door_hao;
          this.Roomform.room_state=row.room_state;
          this.Roomform.isactive=row.isactive;
        },

        //删除数据
        handleDelete(index, row) {
          // console.log(index, row);
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$axios.get('/room/roomDelete.do', {
              params:{
                room_id:row.room_id
              }
            }).then(function (resp) {
                console.log("成功");
              window.location.reload();
              roomtableData=resp.data;
              }).catch(function (err) {
                console.log(err)
              });
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        },

      //编辑弹框的数据
      submit_Form(Roomform){
        this.$refs.Roomform.validate((valid) => {
          if (valid) {
            //编辑部门表单传数据
            this.$axios.get('/room/roomModify.do', {
              params:{
                room_type_id:this.Roomform.room_type_id,
                door_hao:this.Roomform.door_hao,
                room_state:this.Roomform.room_state,
                isactive:this.Roomform.isactive
              }
            }).then(function (res) {
                console.log("成功");
              }).catch(function (err) {
                console.log(err)
              });
            this.dialogFormVisible1=false;
          } else {
            return false;
          }
        })
      },
      //新增房间
      submitForm(Roomform) {
        // console.log("123456789");
        this.$refs.Roomform.validate((valid)=> {
          if (valid) {
            this.$axios.get('/room/roomNew.do', {
              params:{

                door_hao:this.Roomform.value1,
                room_type_id:this.Roomform.room_type_id,
                isactivet:this.Roomform.isactive,
                room_state:this.Roomform.room_state,
                order_id :this.Roomform.order_id,

              }
            }).then(function (res) {
                console.log("ok");
            }).catch(function (err) {
                console.log(err);
              });

            this.dialogFormVisible = false;
            this.EditDialogFormVisible = false;
          } else {
            return false;
          }
        });
      },
    //房间号搜索
        newRoom(){
          this.$axios.get('/room/selectRoom.do',{
            params:{room_id:this.Roomform.input1}
          }).then(function (resp) {
            // this.roomtableData=resp.data;
            console.log(resp.data+"dasdasdasd");
          }).catch(function (err) {
            console.log(err);
          });
        }
  }
  };
</script>

<style scoped>


</style>
