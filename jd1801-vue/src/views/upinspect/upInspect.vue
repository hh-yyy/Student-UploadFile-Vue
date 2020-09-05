<template>
  <el-tabs tab-position="right" style="height: 600px;" :before-leave="taskcut" v-model="tabsname">
    <el-tab-pane label="添加任务">
      <div class="form">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="任务名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="命名规则" prop="rule">
            <el-input v-model="ruleForm.rule"></el-input>
          </el-form-item>
          <el-form-item label="结束时间" required>
            <el-col :span="11">
              <el-form-item prop="date1">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="ruleForm.date1"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-form-item prop="date2">
                <el-time-picker
                  placeholder="选择时间"
                  v-model="ruleForm.date2"
                  style="width: 100%;"
                  format="HH:mm:ss"
                  value-format="HH:mm:ss"
                ></el-time-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')" :plain="true">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-tab-pane>
    <el-tab-pane v-for="(item, index) in task" :label="item.title" :key="index">
      <div class="taskPageTitle">
        <div>
          <el-input :placeholder="item.title" :disabled="true" />
        </div>
        <div>
          <el-input :placeholder="item.overtime.substring(0,19).replace('T',' ')" :disabled="true" />
        </div>
        <div>
          <el-input :placeholder="item.remark" :disabled="true" />
        </div>
      </div>
      <div class="search">
        <div>
          <el-input placeholder="请输入学号搜索" v-model="sidInput" clearable width="30px" />
        </div>
        <div>
          <el-select v-model="uploadchoose" clearable placeholder="请选择">
            <el-option
              v-for="(item,index) in chooseSubmit"
              :key="item"
              :label="item"
              :value="index"
            ></el-option>
          </el-select>
        </div>
        <div>
          <el-button type="primary" icon="el-icon-search" @click="search(item)">搜索</el-button>
        </div>
        <div>
          <el-button type="primary" :loading="downloadAllLoading" @click="downloadAll(item)">
            下载
            <i class="fa fa-download" aria-hidden="true" />
          </el-button>
        </div>
        <div>
          <el-button
            type="primary"
            :loading="taskDeleteLoading==item.title"
            @click="taskDelete(item)"
          >
            删除任务
            <i class="fa fa-trash-o" aria-hidden="true" />
          </el-button>
        </div>
      </div>
      <div class="table">
        <el-table :data="stuTaskDataSearch" style="width: 100%">
          <el-table-column prop="id" label="序号" width="120" align="center"></el-table-column>
          <el-table-column prop="sname" label="姓名" width="180" align="center"></el-table-column>
          <el-table-column prop="sid" label="学号" align="center"></el-table-column>
          <el-table-column label="是否上交" width="180" align="center">
            <template slot-scope="scope">
              <el-tag v-if="scope.row[item.title]!=null" type="success" size="medium">已上交</el-tag>
              <el-tag v-else type="danger" size="medium">未上交</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="下载" width="210" align="center">
            <template slot-scope="scope">
              <el-button
                type="primary"
                :disabled="scope.row[item.title]==null"
                @click="downloadtask(scope.row,item.title)"
                size="medium"
              >
                <i class="fa fa-cloud-download" aria-hidden="true"></i>
                点击下载
                <i class="fa fa-cloud-download" aria-hidden="true"></i>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { addtask, readtask, deletetask, stutask } from "../../api/index";
export default {
  name: "upInspect",
  data() {
    return {
      downloadAllLoading: false,
      tabsname: "",
      stuTaskData: [],
      stuTaskDataSearch: [],
      taskDeleteLoading: "",
      uploadchoose: "",
      task: [],
      sidInput: "",
      ruleForm: {
        name: "",
        rule: "",
        date1: "",
        date2: "",
      },
      chooseSubmit: ["未提交", "已提交"],
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur",
          },
        ],
        rule: [{ required: true, message: "请输入命名规则", trigger: "blur" }],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        date2: [
          {
            type: "string",
            required: true,
            message: "请选择时间",
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addtask(
            this.ruleForm.name,
            this.ruleForm.rule,
            this.ruleForm.date1.toLocaleDateString().replace(/\//g, "-"),
            this.ruleForm.date2,
            this.$store.state.sname,
            this.$store.state.sid_md5
          ).then((res) => {
            if (res == "accomplish") {
              readtask().then((res) => {
                this.task = res.filter(
                  (s) => s.principal == this.$store.state.sname
                );
              });
              this.$message.success("创建成功");
            } else if ((res = "repetition")) {
              this.$message.error("命名重复");
            } else {
              this.$message.error("错误");
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    taskDelete(task) {
      this.taskDeleteLoading = task.title;
      deletetask(task.title).then((res) => {
        this.taskDeleteLoading = "";
        if (res == "accomplish") {
          readtask().then((res) => {
            this.task = res.filter(
              (s) => s.principal == this.$store.state.sname
            );
          });
          this.$message.success("删除成功");
          this.tabsname = "0";
        } else {
          this.$message.error("删除失败");
        }
      });
    },
    taskcut(activeName, oldActiveName) {
      this.uploadchoose = "";
      (this.sidInput = ""), (this.stuTaskDataSearch = this.stuTaskData);
    },
    search(data) {
      let t = this.stuTaskData
        .filter((s) => {
          if (this.uploadchoose == "0") {
            return s[data.title] == null;
          } else if (this.uploadchoose == "1") {
            return s[data.title] != null;
          } else {
            return true;
          }
        })
        .filter((s) => (this.sidInput == "" ? true : s.sid == this.sidInput));
      this.stuTaskDataSearch = t;
    },
    downloadtask(data, title) {
      let fname = data[title];
      let link = document.createElement("a");
      link.href = `${this.$store.state.surl}/task/download?title=${title}&fname=${fname}`;
      link.click();
    },
    downloadAll(data) {
      let link = document.createElement("a");
      link.href = `${this.$store.state.surl}/task/downloadall?title=${data.title}`;
      link.click();
    },
  },
  created: function () {
    readtask().then((res) => {
      this.task = res.filter((s) => s.principal == this.$store.state.sname);
    });
    stutask().then((res) => {
      this.stuTaskData = res;
      this.stuTaskDataSearch = res;
    });
  },
  computed: {},
};
</script>

<style>
.form {
  margin: 50px 100px;
}
.taskPageTitle {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-evenly;
  overflow: auto;
}
.taskPageTitle div {
  padding: 8px 20px;
}
.search {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-evenly;
  overflow: auto;
  padding: 8px;
}
.search el-input {
  padding: 8px 20px;
}
.table {
  padding: 30px 70px;
}
</style>
