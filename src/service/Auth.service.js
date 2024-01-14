import { authKey } from "../constants/storageKey";
import { eraseCookie, getCookie } from "../utils/cookie-storage";
import { decodedToken } from "../utils/jwt";

export const getUserInfo = () => {
  if (typeof window !== "undefined") {
    const jwtoken = getCookie(authKey);
    if (jwtoken) {
      const decodedData = decodedToken(jwtoken);
      return decodedData;
    }
  }
  return "";
};

export const getToken = () => {
  const jwtoken = getCookie(authKey);
  if (jwtoken) {
    return jwtoken;
  } else {
    return "";
  }
};

export const isLoggedin = () => {
  const jwtoken = getCookie(authKey);
  return !!jwtoken;
};

export const removeUserInfo = (key) => {
  return eraseCookie(key);
};
