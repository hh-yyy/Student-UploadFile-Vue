<template>
  <div class="topBar">
    <div class="topbarsname">
      <el-button type="info" size="small" @click="leave">
        {{$store.state.sname}}
        <i class="fa fa-sign-out" aria-hidden="true"></i>
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    leave() {
      this.$store.commit("leave");
      this.$router.replace("/login");
    },
  },
};
</script>

<style>
.topBar {
  height: 50px;
  width: 100%;
  box-shadow: 0px 2px 7px #dddddd;
  margin-bottom: 27px;
  position: relative;
}
.topbarsname {
  position: absolute;
  right: 10%;
  font-size: 20px;
  line-height: 45px;
}
</style>