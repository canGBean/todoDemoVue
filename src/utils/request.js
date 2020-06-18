import axios from "axios";

function request(options) {
  return axios(options)
    .then(res => {
      return res;
    })
    .catch(error => {
      const {
        response: { status, statusText }
      } = error;
      //修改为提示框
      console.log({ status: status, statusText: statusText });

      return Promise.reject(error);
    });
}

export default request;
