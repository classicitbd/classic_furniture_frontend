import { createContext, useEffect, useState } from "react";
import { eraseCookie, getCookie, setCookie } from "../utils/cookie-storage";
import { authKey } from "../constants/storageKey";
import { BASE_URL } from "../utils/baseURL";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      const token = getCookie(authKey);
      if (!token) {
        throw new Error("No token found");
      }

      const response = await fetch(`${BASE_URL}/getMe`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();

      if (data?.statusCode === 200 && data?.success === true) {
        setUser(data?.data);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      handleLogout(); // Log out the user on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleLogout = () => {
    eraseCookie(authKey);
    setUser(null);
  };

  const login = (token) => {
    // Implement setCookie function based on your logic
    setCookie(authKey, token);
    fetchUserData();
  };

  const info = {
    user,
    loading,
    login,
    logout: handleLogout,
  };

  return <AuthContext.Provider value={info}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
