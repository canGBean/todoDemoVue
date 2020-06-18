function login(req) {
  const method = req.method;
  let { name, password } = req.body;
  let token = "error";
  let roles = ["guest"];
  let avatar = "";
  // let { token, roles } = "";
  let res = null;
  const userMap = new Map();
  userMap.set("admin", {
    password: "111111",
    token: "AAAAAA",
    // expdate: "2020-03-09 10:20:20",
    roles: ["admin"],
    avatar:
      "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
  });
  userMap.set("usera", {
    password: "222222",
    token: "BBBBBB",
    roles: ["user"],
    avatar:
      "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"
  });
  userMap.set("userb", {
    password: "333333",
    token: "DDDDDD",
    roles: ["user", "user1"],
    avatar:
      "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"
  });
  userMap.set("guest", {
    password: "999999",
    token: "CCCCCC",
    roles: ["guest"],
    avatar:
      "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"
  });

  switch (method) {
    case "POST":
      if (userMap.get(name) && userMap.get(name).password === password) {
        token = userMap.get(name).token;
        roles = userMap.get(name).roles;
      } else {
        token = "error";
      }
      res = {
        code: 200,
        msg: "SUCCESS",
        exception: "None",
        data: {
          name: name,
          avatar: avatar,
          roles: roles,
          token: token
        },
        timestamp: null
      };
      break;
    case "GET":
      token = req.query.token;
      for (let item of userMap.entries()) {
        if (item[1].token === token) {
          roles = item[1].roles;
          name = item[0];
          token = item[1].token;
          avatar = item[1].avatar;
          break;
        }
      }

      res = {
        code: 200,
        msg: "SUCCESS",
        exception: "None",
        data: {
          name: name,
          avatar: avatar,
          roles: roles,
          token: token
        },
        timestamp: null
      };

      break;
    default:
      res = null;
  }
  return res;
}

//node.js下运行,按照模块规范注册
module.exports = login;
