<template>
  <div id="tab-bar" v-if="$store.state.phone">
    <div
      class="tab-bar-unit"
      @click="itemClick('/upfile')"
      :class="{ activeStyle: check == '/upfile' }"
    >
      <i class="fa fa-upload" aria-hidden="true" /> 上传文件
    </div>
    <div
      v-if="$store.state.adm==1"
      class="tab-bar-unit"
      @click="itemClick('/upinspect')"
      :class="{ activeStyle: check == '/upinspect' }"
    >
      <i class="fa fa-file" aria-hidden="true" /> 文件汇总
    </div>
  </div>
</template>

<script>
export default {
  name: "tabBar",
  data() {
    return {
      check: "/upfile",
    };
  },
  methods: {
    itemClick(path) {
      this.$router.replace(path);
      this.check = path;
    },
  },
};
</script>

<style>
#tab-bar {
  position: fixed;
  height: 100%;
  width: 210px;
  background-color: rgb(48, 65, 86);
  top: 0;
}
.tab-bar-unit {
  line-height: 56px;

  font-size: 18px;
  color: #bfcbdb;
  text-align: center;
  letter-spacing: 4px;
  word-spacing: 13px;
  cursor: pointer;
  transform: border-color 0.3s, background-color 0.3s, color 0.3s;
  transition-property: border-color, background-color, color;
  transition-duration: 0.3s, 0.3s, 0.3s;
  transition-timing-function: ease, ease, ease;
  transition-delay: 0s, 0s, 0s;
}
.tab-bar-unit:hover {
  color: rgb(136, 196, 255);
  background-color: rgb(68, 85, 107) !important;
}
.activeStyle {
  color: rgb(136, 196, 255) !important;
}
</style>
