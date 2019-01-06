<template>
  <div>
    <el-row>
      <el-button @click="Add" class="add" type="primary" plain size="mini">添加房型</el-button>
    </el-row>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="类型名称"
        width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>类型名称:{{ scope.row.room_type_name }} </p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.room_type_name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="酒店名称"
        width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>酒店名称: {{ scope.row.hotelname }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.hotelname }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="每晚价格(元)"
        width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>酒店名称: {{ scope.row.roomPrice }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.roomPrice }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页按钮-->
    <el-pagination
      background
      @current-change="currentChange"
      layout="prev, pager, next"
      v-if="pageStatus"
      :page-size="6"
      :current-page="currentPage"
      :total="total">
    </el-pagination>
    <!--编辑弹框-->
    <el-dialog title="房型列表详情" :visible.sync="dialogFormVisible" class="el-dialog-header">
      <el-form :model="form" :rules="rules" ref="form" class="updateForm">
        <el-form-item label="客房类型名称：" :label-width="formLabelWidth" prop="room_type_name">
          <el-input v-model="form.room_type_name" name="room_type_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="酒店名称：" :label-width="formLabelWidth" prop="hotelname">
          <el-select v-model="form.hotelname" name="hotelname" autocomplete="off" placeholder="请选择酒店">
            <el-option label="常春堡" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="能入住的人数：" :label-width="formLabelWidth" prop="guestNum">
          <el-select v-model="form.guestNum" name="guestNum" autocomplete="off" placeholder="请选择能入住的人数">
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
            <el-option label="4" value="4"></el-option>
            <el-option label="5" value="5"></el-option>
            <el-option label="6" value="6"></el-option>
            <el-option label="7" value="7"></el-option>
            <el-option label="8" value="8"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="每晚价格(RMB):" :label-width="formLabelWidth" prop="roomPrice">
          <el-input v-model="form.roomPrice" name="roomPrice" v-model.number="form.roomPrice" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="更多：" :label-width="formLabelWidth" prop="room_type_more">
          <el-input type="textarea" :rows="4" v-model="form.room_type_more" name="room_type_more"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="Cancel('form')">取 消</el-button>
        <el-button type="primary" @click="submitForm1('form')" :plain="true">确 定</el-button>
      </div>
    </el-dialog>
    <!--添加房型-->
    <el-dialog title="添加房型" :visible.sync="dialogFormVisible1" class="el-dialog-header">
      <el-form :model="form" class="addForm" :rules="rules" ref="form">
        <el-form-item label="客房类型名称：" :label-width="formLabelWidth" prop="room_type_name">
          <el-input v-model="form.room_type_name" name="room_type_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属酒店：" :label-width="formLabelWidth" prop="hotelname">
          <el-select v-model="form.hotelname" name="hotelname" autocomplete="off" placeholder="请选择酒店">
            <el-option label="常春堡" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客房数量：" :label-width="formLabelWidth" prop="roomNum">
          <el-select v-model="form.roomNum" name="roomNum" autocomplete="off">
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
            <el-option label="4" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入住人数：" :label-width="formLabelWidth" prop="guestNum">
          <el-select v-model="form.guestNum" name="guestNum" autocomplete="off">
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
            <el-option label="4" value="4"></el-option>
            <el-option label="5" value="5"></el-option>
            <el-option label="6" value="6"></el-option>
            <el-option label="7" value="7"></el-option>
            <el-option label="8" value="8"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="添加照片：" :label-width="formLabelWidth" prop="dialogImageUrl">
          <el-upload id="addPhoto"
                     action="/upimg/"
                     :onSuccess="uploadSuccess"
                     ref="upfile"
                     list-type="picture-card"
                     :data="form.upLoadData"
                     :before-upload="beforeImgUpload"
                     :on-preview="handlePictureCardPreview"
                     :on-remove="handleRemove" >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="form.dialogImageUrl" alt="" name="img">
          </el-dialog>
        </el-form-item>
        <el-form-item label="每晚价格(RMB):" :label-width="formLabelWidth" prop="roomPrice">
          <el-input v-model="form.roomPrice" name="roomPrice" v-model.number="form.roomPrice" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注信息：" :label-width="formLabelWidth" prop="room_type_more">
          <el-input type="textarea" :rows="4" v-model="form.room_type_more" name="room_type_more"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="Cancel('form')">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')" :plain="true">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>

  export default {
    data () {
//      全局调用查询函数--自执行
      this.$options.methods.created(this);

      return {
// ======表格数据=======
        tableData: [ ],
        total:20,
        totalPage:0,//总页数 默认为0
        currentPage:2,//当前页数  默认为1
        current:1,//按钮当前页
        pageStatus:true,

//======编辑弹框=======
        dialogFormVisible: false,
        dialogFormVisible1: false,
        form: {
          uploadUrl:'/upimg/',
          upLoadData:{
            img_base64:"",
            type:1
          },
          room_type_name: '',
          hotelname: '',
          guestNum: '',
          roomPrice: '',
          room_type_more: '',
          roomNum:'',
          dialogImageUrl: '',
          configuration:'',
          file:{
            dataType:0,
            oldFilePath:""
          }
        },
        formLabelWidth: '125px',
//      上传照片

        dialogVisible: false,

        rules: {
          room_type_name: [
            { required: true, message: '请输入客房类型名称', trigger: 'blur' },
          ],
          hotelname: [
            { required: true, message: '请选择所属酒店', trigger: 'change' }
          ],
          roomNum: [
            { required: true, message: '请选择客房数量', trigger: 'change' }
          ],
          guestNum: [
            { required: true, message: '请选择入住人数', trigger: 'change' }
          ],
          roomPrice: [
            { required: true, message: '请输入基础价格', trigger: 'blur' },
            { type: 'number', message: '价格必须为数字值'}
          ],
          configuration: [
            { required: true, message: '请选择配置', trigger: 'change' }
          ],
          room_type_more: [
            { required: true, message: '请输入备注信息', trigger: 'blur' },
          ],
        },

      };
    },

    methods: {

// ====================查询=================
      created:function (obj) {
        let currentPage=1;//设置当前默认在第1页
        obj.pageStatus=false;
        obj.$axios.get('/room/roomTypeStables.do?currentPage='+currentPage)
          .then(function (resp) {
            obj.total=resp.data.pages;//根据后台数据 得到一共有多少页
            obj.tableData=resp.data.data;//查询的数据 每页显示6条
            obj.currentPage=1;
            obj.pageStatus=true;
          });
      },
//================当前页==============================
      currentChange:function (obj) {
        let currentPage=obj;
        let that = this;
        this.$axios.get('/room/roomTypeStables.do?currentPage='+currentPage)
          .then(function (resp) {
            that.total=resp.data.pages;//根据后台数据 得到一共有多少页
            that.tableData=resp.data.data;//查询的数据 每页显示6条
          })
      },


//   ===============编辑房型 表单================
      handleEdit (index, row) {
        this.dialogFormVisible = true;//显示编辑表单

        //获取页面上的数据存在form里面
        this.form.room_type_name=row.room_type_name;
        this.form.hotelname=row.hotelname;
        this.form.hotel_id=row.hotel_id;
        this.form.guestNum=row.guestNum;
        this.form.roomPrice=row.roomPrice;
        this.form.room_type_more=row.room_type_more;
        this.form.room_type_id=row.room_type_id;

      },
//===编辑房型+  提交表单 确定
      submitForm1(formName) {
        let that=this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //获取增加表单的输入框数据
            let formData = [this.form.room_type_name,this.form.hotel_id,this.form.guestNum,this.form.roomPrice,this.form.room_type_more,this.form.room_type_id];
            this.$axios.get("/room/updateRoomCastle.do",{params: {//获取的参数往后传参
              formData
            }
            })
              .then(function (resp) {
                if(resp.status==200){//后台传入的数据为字符串"err"
                  that.$message({
                    type: 'success',
                    message: '编辑成功!',
                  });
                  that.$options.methods.created(that);//调用查询函数  刷新页面
                }
                else{
                  that.$message.error(
                    '编辑失败!'
                  );
                }
              })
              .catch(function () {
                this.$message({
                  type: 'info',
                  message: '已取消添加'
                });
              });
            this.dialogFormVisible = false;
          } else {
            return false;
          }
        });
        this.$refs[formName].resetFields();//重置表单字段
      },

//  提交表单 ---- 取消
      Cancel(formName){
        this.$refs[formName].resetFields();
        this.$message({
          type: 'info',
          message: '已取消!'
        });
        this.dialogFormVisible = false;
        this.dialogFormVisible1 = false;
      },

      //=============添加房型=================
      Add(){
        this.form.room_type_name="";
        this.form.hotelname="";
        this.form.roomNum="";
        this.form.guestNum="";
        this.form.roomPrice="";
        this.form.room_type_more="";
        this.dialogFormVisible1 = true;//让添加房型的弹框弹出
      },
//======新增房型  提交表单  确定
      submitForm(formName) {
        let that=this;

        this.$refs[formName].validate((valid) => {
          if (valid) {
            //获取增加表单的输入框数据
            let formData = [this.form.room_type_name,this.form.hotelname,this.form.guestNum,this.form.upLoadData.img_base64,this.form.roomNum,this.form.roomPrice,this.form.room_type_more];
            this.$axios.get("/room/addRoomCastle.do",{params: {//获取的参数往后传参
              formData
            }
            })
              .then(function (resp) {
                if(resp.status==200){//后台传入的数据为字符串"err"
                  that.$message({
                    type: 'success',
                    message: '添加成功!',
                  });
                  that.$options.methods.created(that);//调用查询函数  刷新页面
                }
                else{
                  that.$message.error(
                    '添加失败!'
                  );
                }
              })
              .catch(function () {
                this.$message({
                  type: 'info',
                  message: '已取消添加'
                });
              });
            this.dialogFormVisible1 = false;
          } else {
            return false;
          }
        });
        this.$refs[formName].resetFields();//重置表单字段
      },

//    =========删除=================
      handleDelete (index, row) {
        var that=this;
        this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.get('/api/deleteRoomCastle.do?room_type_id='+row.room_type_id)
            .then((res)=>{
              if(res.data=="err"){//后台传入的数据为字符串"err"
                this.$message.error(
                  '删除失败!'
                );
              }
              else{
                this.$message({
                  type: 'success',
                  message: '删除成功!',
                });
                that.$options.methods.created(that);// 调用查询函数  刷新页面
              }
            });

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

//===========添加照片=====================
      // 文件上传前
      beforeImgUpload (file) {
        const self = this;  //这个很重要！
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function() {
          self.form.upLoadData.img_base64 = this.result;
          console.log(self.form.upLoadData.img_base64);
        };
      },
//    文件上传成功
      uploadSuccess (response, file, fileList) {
        console.log('上传文件', response);
//        this.$alert(response.retData.msg);
        console.log(this.form.upLoadData.img_base64);
      },

      handleRemove(file, fileList) {
      console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.form.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }

    },


  }
</script>

<style scoped>
  .add{
    margin-left: 50%;
  }
  .el-select{
    float: left;
  }

  /*添加照片*/
  #addPhoto{
    float: left;
  }

  /*分页按钮*/
  .el-pagination{
    position: fixed;
    top: 83%;
    left: 60%;
  }

</style>
