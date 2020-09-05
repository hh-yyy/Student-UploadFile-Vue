import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
console.log(document.body.clientWidth);
let showphone = document.body.clientWidth > 700;
let { surl } = require("../api/index.js");
console.log(surl);
export default new Vuex.Store({
  state: {
    sname: "",
    adm: -1,
    sid_md5: "",
    phone: showphone,
    surl: surl,
  },
  mutations: {
    setUserInformation(state, stuInformation) {
      state.sname = stuInformation.sname;
      state.adm = stuInformation.adm;
      state.sid_md5 = stuInformation.sid_md5;
    },
    leave(state) {
      state.adm = -1;
    },
  },
  actions: {},
  modules: {},
});
