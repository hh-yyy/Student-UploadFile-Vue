// import { login } from "./api/login.js";

let express = require("express");
let app = express();
const bodyParser = require("body-parser");
const multer = require("multer");
const pathLib = require("path");

const login = require("./api/login");
const addtask = require("./api/addtask");
const readtask = require("./api/readtask");
const deletetask = require("./api/deletetask");
const stutask = require("./api/stutask");
const uploadfiletask = require("./api/uploadfiletask");
const downloadtask = require("./api/downloadtask");
const downloadalltask = require("./api/downloadalltask");

//跨域
app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", "*");
  res.append("Access-Control-Allow-Origin-Type", "*");
  next();
});

//get请求
app.get("/login", login);
app.get("/task/add", addtask);
app.get("/task/read", readtask);
app.get("/task/delete", deletetask);
app.get("/task/stu", stutask);
app.get("/task/download", downloadtask);
app.get("/task/downloadall", downloadalltask);

//post请求
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: "./dist" }).array("file"));
app.post("/task/uploadfile", uploadfiletask);

//下载地址
// app.use("/taskdownload", express.static("taskUpload"));

//监听
app.listen(18001, () => {
  console.log("http://locahost:18001");
});
