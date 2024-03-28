import { createContext, useEffect, useState } from "react";
import { getCookie } from "../utils/cookie-storage";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const [addressUpdate, setAddressUpdate] = useState(false);

  useEffect(() => {
    setUserLoading(true);
    const getUser = getCookie("user");
    if (getUser !== undefined) {
      const user = JSON.parse(getUser);
      setUserData(user);
    }
    setUserLoading(false);
  }, []);

  const info = {
    userData,
    setUserData,
    userLoading,
    addressUpdate,
    setAddressUpdate,
  };

  return <UserContext.Provider value={info}>{children}</UserContext.Provider>;
};

export default UserProvider;
