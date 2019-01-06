<template>
  <div>
    <!--增加的按钮-->
    <el-button type="primary" v-on:click="showAddConsume" round>添加</el-button>
    <!--增加的按钮-->

    <el-table
      :data="consume.consumeList"
      style="width: 100%"
    max-height="400">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand ad">
            <el-form-item label="活动套餐">
              <div class="w60"></div>
              <b><span>{{ props.row.room_consume_name }}</span></b>
            </el-form-item>
            <hr>
            <el-form-item label="套餐包含">
              <div class="w60"></div>
              <el-tag type="success" v-for="active in props.row.active_id">{{consume.consumeList.activeName[active]}}</el-tag>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="套餐名称"
        prop="room_consume_name">
      </el-table-column>
      <el-table-column
        label="所属酒店"
        prop="hotel_name">
      </el-table-column>
      <el-table-column label="描述">
        <template slot-scope="scope">
          <i class="more" :title="scope.row.more">{{scope.row.more}}</i>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="160">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="deleteConsume(scope.$index, scope.row)">删除</el-button>
          <el-button
            size="mini"
            @click="showEditConsume(scope.$index, scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--添加的弹框-->
    <el-dialog
      title="添加套餐"
      :visible.sync="consume.dialogFormVisible"
       width="30%"
      custom-class="css2"
      :show-close=false>
      <el-form ref="consume.form_Consume" :model="consume.form_Consume" label-width="80px" label-position="right" class="myfrom">
        <el-form-item label="套餐名称">
          <el-input v-model="consume.form_Consume.room_consume_name" ></el-input>
        </el-form-item>
        <el-form-item label="活动套餐">
          <!--{{listConsume.activeName}}-->
          <el-select ref="addActive" v-model="consume.form_Consume.active" multiple collapse-tags  placeholder="请选择配置" class="left" id="select_left" name="active">
            <el-option v-for="(value,key) in consume.active" :label="value" :value="key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="酒店类型">
          <!--{{listConsume.activeName}}-->
          <el-select ref="addHotel" v-model="consume.form_Consume.hotel_name" placeholder="请选酒店类型" class="left" id="select_left" name="active">
            <el-option v-for="(value,key) in consume.hotel_name" :label="value" :value="key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客房费用">
          <el-input v-model="consume.form_Consume.price"></el-input>
        </el-form-item>
        <el-form-item label="更多描述">
          <el-input type="textarea" v-model="consume.form_Consume.more" ></el-input>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="6" offset="6">
            <el-button type="primary" @click="consumeOK" plain>确 定</el-button>
          </el-col>
          <el-col :span="6" offset="3">
            <el-button @click="consumeCancel" plain>取 消</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <div class="block">
      <el-pagination
        @current-change="getConsume"
        :current-page="consume.page.currentPage"
        :page-sizes="consume.page.pageSizes"
        :page-size="consume.page.pageSize"
        layout="total, prev, pager, next, jumper"
        :total="consume.page.total">
      </el-pagination>
    </div>
  </div>

</template>

<script>
    export default {
      name: "listConsume",
      data() {
          // this.$options.methods.getConsume(1,this);
        this.getConsume(1);
        return {
          consume:{
            consumeList: [],
            search:"",
            dialogTableVisible: false,
            dialogFormVisible: false,
            form_Consume: {
              room_consume_id:"",
              active_id:"",
              room_consume_name: '',
              price: '',
              active: '',
              more: '',
              hotel_name:'',
              hotel_id:""
            },
            page:{
              currentPage:1,
              pageSize:5,
              total:40
            },
            hotel_name:"",
            active:"",
            OKStatus:"",
            formLabelWidth: '120px'
          }
          }
      },
      methods:{
        consumeOK(){
         this[this.consume.OKStatus]();
         this.consume.dialogFormVisible=false;
          },
        consumeCancel(){
          this.consume.dialogFormVisible = false;
          this.consume.form_Consume.more="";
          this.consume.form_Consume.active=[];
          this.consume.form_Consume.hotel_name=[];
          this.consume.form_Consume.price="";
          this.consume.form_Consume.name="";
        },
        async getAllConsume(){
          let that=this;
          console.log("kais");
          let result = await this.$axios.get('/consume/getAllConsume.do');
          let data=result.data;
          this.consume.hotel_name=data.hotelName;
          for (let i=0;i<data.consume.length;i++){
             data.consume[i].hotel_name=
             this.consume.hotel_name[data.consume[i].hotel_id];
         }
         this.consume.consumeList=data;
        },


        async getConsume(page){
          let that=this;
          let result=await that.$axios.get('/consume/getConsume.do', {
            params: {
              start: (page - 1) * 5,
              length: 5,
            }
          });

          let data=result.data;
          if(data.pageCount>0){
                that.consume.page.total=data.pageCount;
              }else {
            that.consume.page.total=1;
          }
          that.consume.hotel_name=data.hotelName;
            for (let i=0;i<data.consume.length;i++){
              data.consume[i].hotel_name=
                that.consume.hotel_name[data.consume[i].hotel_id];
            }
            that.consume.consumeList=data.consume;
            that.consume.active=data.activeName;
        },

        showAddConsume(){//添加套餐的方法
          this.consume.dialogFormVisible=true;
          this.consume.OKStatus="addConsume";
        },

        showEditConsume(index,row){
          this.consume.dialogFormVisible=true;
          this.consume.OKStatus="editConsume";
          Object.assign(this.consume.form_Consume,row);
          this.consume.form_Consume.hotel_name=row.hotel_id.toString();
          this.consume.form_Consume.active=row.active_id.map(value=>value.toString());
          console.log(row);
        },

        async addConsume(){
          let addConsume= await this.$axios.post("/consume/addConsume.do",this.consume.form_Consume);
          this.consume.dialogFormVisible = false;
          this.consume.form_Consume.active=[];
          this.consume.form_Consume.hotel_name=[];
          this.consume.form_Consume.more="";
          this.consume.form_Consume.price="";
          this.consume.form_Consume.name="";
        },

        editConsume(){
          if(this.consume.form_Consume.price==""){
            this.consume.form_Consume.price=0;
          }
          this.$axios.post("/consume/editConsume.do",{
            consume:this.consume.form_Consume
          }).then(result=>{
            console.log(result.data);
            //如果返回的状态为1,说明修改成功，刷新数据，如果修改失败，弹出消息框
            if(result.data.state==1){

              console.log(this.consume.page.currentPage);
              this.$message({
                type: 'success',
                message: '修改成功!'
              })
              this.getConsume(this.consume.page.currentPage);
            }else {
              this.$message({
                type: 'info',
                message: '修改失败!'
              })
            }
          }).catch(()=>{
            this.$message({
              type: 'info',
              message: '修改失败!'
            })
          })
        },

        deleteConsume(index,row){
          let id=row.room_comsuem_id;
            this.$confirm('此操作将永久删除该套餐, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$axios.post("/consume/deleteConsume.do",{
                "consume_id":row.room_consume_id
              }).then((e)=>{
                console.log(e.data);
                console.log(this)
                if(e.data.state==1){
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  });
                  this.getConsume(this.consume.page.currentPage);
                }else {
                  console.log(e.data);
                  this.$message({
                    type: 'info',
                    message: '删除失败'
                  });
                }
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });

        }
      }
    }

</script>

<style scoped>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .el-button{
    float: right;
  }
  .el-tag{
    margin-left: 10px;
  }
  .w60{
    width: 60px;
    height: 1px;
    display: inline-block;
  }
  .more{
    display: inline-block;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .el-pagination{
    position: fixed;
    top:90%;
    right: 10%;
  }
</style>
