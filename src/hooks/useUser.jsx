import { useEffect, useState } from "react";
import { getCookie } from "../utils/cookie-storage";

const useUser = () => {
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
  return [user, loading];
};

export default useUser;
