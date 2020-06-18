function logout(req) {
  const method = req.method;
  let { token } = req.body;
  let res = null;
  const userJsonObj = require("./user").userObj;
  switch (method) {
    case "POST":
      for (let item in userJsonObj) {
        if (userJsonObj[item] && userJsonObj[item].token === token) {
          res = {
            message: userJsonObj[item].name + "退出成功",
            userInfo: { token: token }
          };
          break;
        }
      }
      res = {
        message: "未知用户,退出成功",
        userInfo: { token: token }
      };
      break;
    default:
      res = null;
  }
  return res;
}

//node.js下运行,按照模块规范注册
module.exports = logout;
