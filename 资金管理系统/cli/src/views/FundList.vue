<template>
  <div class="fillContainer">
    <div>
      <el-form :inline="true" ref="add_data" :model="search_data">
        <!-- 筛选 -->
        <el-form-item label="按照时间筛选:" class="left">
          <el-date-picker v-model="search_data.startTime" type="datetime" placeholder="选择开始时间"></el-date-picker>--
          <el-date-picker v-model="search_data.endTime" type="datetime" placeholder="选择结束时间"></el-date-picker>
        </el-form-item>
        <el-form-item class="left">
          <el-button type="primary" size="small" icon="search" @click="handleSearch()">筛选</el-button>
        </el-form-item>

        <el-form-item class="btnRight">
          <el-button type="primary" size="small" icon="view" @click="handleAdd()">添加</el-button>
          <!-- v-if="user.identity == 'manager'" -->
        </el-form-item>
      </el-form>
    </div>
    <div class="table_container">
      <el-table
        v-if="tableData.length > 0"
        :data="tableData"
        max-height="450"
        border
        style="width: 100%"
      >
        <el-table-column label="序号" type="index" align="center" width="70"></el-table-column>

        <el-table-column label="创建时间" prop="create_date" align="center" width="250">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.create_date }}</span>
          </template>
        </el-table-column>

        <el-table-column label="收支类型" prop="income_type" align="center" width="150">
          <template slot-scope="scope">
            <span style="color:#f56767">{{scope.row.income_type==1?'微信':'支付宝'}}</span>
          </template>
        </el-table-column>

        <el-table-column label="收支描述" prop="income_remark" align="center" width="180"></el-table-column>

        <el-table-column label="收入" prop="income" align="center" width="170">
          <template slot-scope="scope">
            <span style="color:#00d053">{{ scope.row.income }}</span>
          </template>
        </el-table-column>

        <el-table-column label="支出" prop="pay" align="center" width="170">
          <template slot-scope="scope">
            <span style="color:#f56767">{{ scope.row.pay }}</span>
          </template>
        </el-table-column>

        <el-table-column label="账户现金" prop="account" align="center" width="170">
          <template slot-scope="scope">
            <span style="color:#4db3ff">{{ scope.row.account }}</span>
          </template>
        </el-table-column>

        <el-table-column label="备注" prop="remark" align="center" width="220"></el-table-column>
        <el-table-column label="操作" prop="operation" align="center" fixed="right" width="320">
          <!-- v-if="user.identity == 'manager'" -->
          <template slot-scope="scope">
            <el-button
              type="warning"
              icon="edit"
              size="small"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button type="danger" icon="delete" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-row>
        <el-col :span="24">
          <div class="pagination">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="paginations.page_index"
              :page-sizes="paginations.page_sizes"
              :page-size="paginations.page_size"
              :layout="paginations.layout"
              :total="paginations.total"
            ></el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>

    <Dialog :dialog="dialog" :formData="formData" v-on:update="getItem"></Dialog>
  </div>
</template>




<script>
import Dialog from "../components/Dialog";
export default {
  name: "fundList",
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  data() {
    return {
      search_data: {
        startTime: "",
        endTime: ""
      },
      filterTableData: [],
      paginations: {
        page_index: 1, // 当前位于哪页
        total: 0, // 总数
        page_size: 5, //一页显示多少条
        page_sizes: [5, 10, 15, 20, 100], //每页显示多少条
        layout: "total,sizes,prev,pager,next,jumper" //翻页属性
      },
      tableData: [],
      allTableData: [],
      dialog: {
        show: false,
        title: "",
        option: "edit"
      },
      formData: {
        income_type: "",
        income_remark: "",
        income: "",
        pay: "",
        account: "",
        remark: "",
        _id: ""
      }
    };
  },
  components: {
    Dialog
  },
  created() {
    //获取账单
    this.getProfile();
  },
  methods: {
    getItem(e) {
      this.getProfile();
      // e.create_date=new Date()
      // this.tableData.push(e)
    },
    getProfile() {
      //获取表格数据
      this.$axios
        .get(this.api.GET_BILL())
        .then(res => {
          // console.log(res)
          this.allTableData = res.data.data;
          this.filterTableData = res.data.data;
          //设置分页数据
          this.setPaginations();
          console.log(this.tableData);
        })
        .catch(err => {
          console.log(err.response.data);
        });
    },
    setPaginations() {
      //分页属性
      this.paginations.total = this.allTableData.length;
      //设置当前页数
      this.paginations.page_index = 1;
      this.paginations.page_size = 5;
      //设置默认的分页数据
      this.tableData = this.allTableData.filter((item, index) => {
        return index < this.paginations.page_size;
      });
    },
    handleEdit(index, row) {
      //编辑
      (this.dialog = {
        show: true,
        title: "修改资金信息",
        option: "edit"
      }),
        (this.formData = {
          income_type: row.income_type,
          income_remark: row.income_remark,
          income: row.income,
          pay: row.pay,
          account: row.account,
          remark: row.remark,
          _id: row._id
        });
    },
    handleDelete(index, row) {
      // this.$axios.post(`/api/user/order/delete/${row._id}`)
      console.log(row._id);
      this.$axios
        .post(this.api.POST_DELETE(), {
          _id: row._id
        })
        .then(res => {
          this.$message("删除成功");
          this.getProfile();
        });
    },
    handleAdd() {
      this.dialog.show = true;
      (this.dialog = {
        show: true,
        title: "添加资金信息",
        option: "add"
      }),
        (this.formData = {
          income_type: "",
          income_remark: "",
          income: "",
          pay: "",
          account: "",
          remark: "",
          _id: ""
        });
    },
    handleSizeChange(page_size) {
      //切换size
      this.paginations.page_index = 1;
      this.paginations.page_size = page_size;
      //遍历
      this.tableData = this.allTableData.filter((item, index) => {
        return index < page_size;
      });
    },
    handleCurrentChange(page) {
      // 获取当前页
      let index = this.paginations.page_size * (page - 1);
      //数据的总数
      let nums = this.paginations.page_size * page;
      //容器
      let tables = [];

      for (let i = index; i < nums; i++) {
        if (this.allTableData[i]) {
          tables.push(this.allTableData[i]);
        }
        this.tableData = tables;
      }
    },
    handleSearch() {
      //筛选
      if (!this.search_data.startTime || !this.search_data.endTime) {
        this.$message({
          type: "warning",
          message: "请选择时间区间"
        });
        this.getProfile();
        return;
      }

      const sTime = this.search_data.startTime.getTime();
      const eTime = this.search_data.endTime.getTime();

      this.allTableData = this.filterTableData.filter(item => {
        // consolo.log(item);
        let date = new Date(item.date);
        let time = date.getTime();
        return time >= sTime && time <= eTime;
      });

      //分页数据调用
      this.setPaginations();
    }
  }
};
</script>

<style scoped>
.fillContainer {
  width: calc(100% - 180px);
  float: right;
  padding: 16px;
  box-sizing: border-box;
  /* background:red; */
}
.btnRight {
  float: right;
}
.left {
  float: left;
}

.pagination {
  text-align: right;
  margin-top: 10px;
}
</style>