import { createContext, useEffect, useState } from "react";
import { getCookie } from "../utils/cookie-storage";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const getData = getCookie("user");
    if (getData) {
      const userData = JSON.parse(getData);
      setUser(userData);
      setLoading(false);
    }
  }, []);

  const info = {
    user,
    loading,
  };

  return <UserProvider.Provider value={info}>{children}</UserProvider.Provider>;
};

export default UserProvider;
