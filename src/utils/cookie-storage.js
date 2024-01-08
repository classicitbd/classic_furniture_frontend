import Cookies from "js-cookie";

export const setCookie = (name, value, days) => {
  return Cookies.set(name, value, { expires: days });
};

export const getCookie = (name) => {
  return Cookies.get(name);
};

export const eraseCookie = (name) => {
  return Cookies.remove(name);
};
