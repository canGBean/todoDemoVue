const userInfoMock = {
  userObj: {
    admin: {
      name: "admin",
      password: "111111",
      token: "AAAAAA",
      roles: ["admin"],
      avatar:
        "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
    },
    usera: {
      name: "usera",
      password: "222222",
      token: "BBBBBB",
      roles: ["user"],
      avatar:
        "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"
    },
    userb: {
      name: "userb",
      password: "333333",
      token: "DDDDDD",
      roles: ["user", "user1"],
      avatar:
        "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"
    },
    guest: {
      name: "guest",
      password: "999999",
      token: "CCCCCC",
      roles: ["guest"],
      avatar:
        "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"
    }
  }
};

module.exports = userInfoMock;
