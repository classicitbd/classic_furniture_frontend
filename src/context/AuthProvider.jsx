/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { getCookie } from "../utils/cookie-storage";
import { authKey } from "../constants/storageKey";
import { BASE_URL } from "../utils/baseURL";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userPhone, setUserPhone] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = getCookie(authKey);

  useEffect(() => {
    if (token) {
      fetch(`${BASE_URL}/getMe`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.statusCode == 200 && data?.success == true) {
            setUser(data?.data?.email);
            setUserName(data?.data?.name);
            setUserRole(data?.data?.role);
            setUserPhone(data?.data?.phone);
            setLoading(false);
          } else {
            setUser(null);
            setUserName(null);
            setUserPhone(null);
            setUserRole(null);
          }
        });
    } else {
      setUser(null);
      setUserName(null);
      setUserPhone(null);
      setUserRole(null);
      setLoading(false);
    }
  }, [token]);

  const info = {
    user,
    userName,
    userRole,
    userPhone,
    loading,
  };

  return <AuthContext.Provider value={info}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
