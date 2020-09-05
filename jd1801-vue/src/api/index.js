import axios from "axios";
let urlset = "http://127.0.0.1:18001";
//登录

export const surl = urlset;

export const login = (username, password) => {
  return axios({
    url: `${urlset}/login`,
    params: {
      username: username,
      password: password,
    },
  }).then((res) => {
    return res.data.resdata;
  });
};

//添加任务
export const addtask = (
  taskName,
  taskRule,
  taskData,
  taskTime,
  principal,
  sid_md5
) => {
  return axios({
    url: `${urlset}/task/add`,
    params: {
      title: taskName,
      principal: principal,
      sid_md5: sid_md5,
      taskData: taskData,
      taskTime: taskTime,
      remark: taskRule,
    },
  }).then((res) => {
    return res.data.result;
  });
};

//读取任务

export const readtask = () => {
  return axios({
    url: `${urlset}/task/read`,
  }).then((res) => {
    return res.data.taskData;
  });
};

//删除任务
export const deletetask = (title) => {
  return axios({
    url: `${urlset}/task/delete`,
    params: {
      title,
    },
  }).then((res) => {
    return res.data.result;
  });
};

//学生上交任务
export const stutask = (title) => {
  return axios({
    url: `${urlset}/task/stu`,
  }).then((res) => {
    return res.data.stuTaskData;
  });
};
