import Cookies from "js-cookie";

const TokenKey = "user-Token";

// Cookies.defaults = { expires: 1 };

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token, { path: "/" });
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}
