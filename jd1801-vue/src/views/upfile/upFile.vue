<template>
  <div id="upfile" :class="{'upfile':$store.state.phone,'upfilephone':!$store.state.phone}">
    <el-table :data="task" style="width: 100%">
      <el-table-column prop="tableid" label="序号" width="60" align="center"></el-table-column>
      <el-table-column prop="title" label="标题" align="center"></el-table-column>
      <el-table-column prop="principal" label="负责人" width="90" align="center"></el-table-column>
      <el-table-column prop="overtime" label="结束时间" width="180" align="center"></el-table-column>
      <el-table-column label="状态" width="120" align="center">
        <template slot-scope="scope">
          <el-tag v-if="stuTaskData[scope.row.title]!=null" type="success">已上交</el-tag>
          <el-tag v-else type="danger">未上交</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="提交" width="240" align="center">
        <template slot-scope="scope">
          <el-upload
            class="upload-demo"
            :ref="`upload${scope.row.tableid}`"
            :action="`${$store.state.surl}/task/uploadfile?sid=${stuTaskData.sid}&task_title=${scope.row.title}&sname=${stuTaskData.sname}&remark=${scope.row.remark}&rname=${stuTaskData[scope.row.title]}`"
            :auto-upload="false"
            :on-success="fileSuccess"
            :limit="1"
          >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button
              style="margin-left: 10px;"
              size="small"
              type="success"
              @click="submitUpload(scope)"
            >上传到服务器</el-button>
          </el-upload>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { readtask, stutask } from "../../api/index";
export default {
  data() {
    return {
      task: [],
      stuTaskData: [],
    };
  },
  methods: {
    submitUpload(data) {
      this.$refs[`upload${data.row.tableid}`].submit();
    },
    fileSuccess() {
      stutask().then((res) => {
        this.stuTaskData = res.filter(
          (s) => s.sid_md5 == this.$store.state.sid_md5
        )[0];
      });
    },
  },
  computed: {},
  created: function () {
    readtask().then((res) => {
      this.task = res
        .map((s) => {
          s.overtime = s.overtime.substring(0, 19).replace("T", " ");
          return s;
        })
        .filter(
          (s) =>
            new Date(s.overtime.substring(0, 19).replace("T", " ")) * 1 >
            Date.now()
        )
        .map((s, index) => {
          s.tableid = index + 1;
          return s;
        });
    });
    stutask().then((res) => {
      this.stuTaskData = res.filter(
        (s) => s.sid_md5 == this.$store.state.sid_md5
      )[0];
    });
  },
};
</script>

<style>
.upfilephone {
  padding: 0 20px;
}

.upfile {
  padding: 0 70px;
}
</style>
