import request from "@/utils/request";

export function getInfo(token) {
  return request({
    url: "/api/user/login",
    method: "get",
    params: { token: token }
  });
}

export function login(username, password) {
  return request({
    url: "/api/user/login",
    method: "post",
    data: { name: username, password: password }
  });
}

export function logout(token) {
  return request({
    url: "/api/user/logout",
    method: "post",
    data: { token: token }
  });
}
