import { useEffect, useState } from "react";
import { getUserInfo } from "../service/Auth.service";
import { BASE_URL } from "../utils/baseURL";

const useUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { email } = getUserInfo();
  useEffect(() => {
    if (email) {
      fetch(`${BASE_URL}/getMe/${email}`)
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [email]);
  return [user, loading];
};

export default useUser;
