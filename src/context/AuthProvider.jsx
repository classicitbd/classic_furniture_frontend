import { createContext, useEffect, useState } from "react";
import { getCookie } from "../utils/cookie-storage";
import { authKey } from "../constants/storageKey";
import { BASE_URL } from "../utils/baseURL";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getCookie(authKey);
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
            setUser(data?.data);
            setLoading(false);
          } else {
            setUser({});
            setLoading(false);
          }
        });
    } else {
      setUser({});
      setLoading(false);
    }
  }, []);

  // console.log( "Fromn auth provider,", user)

  const info = {
    user,
    loading,
  };

  return <AuthContext.Provider value={info}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
