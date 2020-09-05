<template>
  <div id="App">
    <login v-if="$store.state.adm == -1"></login>
    <div v-else>
      <!-- <up-file></up-file> -->
      <tab-bar></tab-bar>
      <div :class="{'main': $store.state.phone}">
        <top-bar></top-bar>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import login from "./views/login/login";
import upFile from "./views/upfile/upFile";
import tabBar from "./components/tabbar/tabBar";
import topBar from "./components/topbar/topBar";
export default {
  name: "App",
  components: {
    login,
    upFile,
    tabBar,
    topBar,
  },
};
</script>

<style>
#App {
  margin: 0;
  padding: 0;
}
.main {
  position: relative;
  top: 0;
  margin: 0 0 0 210px;
}
</style>
