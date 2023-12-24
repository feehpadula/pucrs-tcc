import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { usePost } from "../hooks/usePost";

export const TOKEN_KEY = "JWT_TOKEN";

export const IsAuthenticated = () => {
  /* eslint-disable */
  const [cookies, setCookie, removeCookie] = useCookies([TOKEN_KEY]);
  /* eslint-disable */

  let { postData, data, isLoading, error } = usePost();

  useEffect(() => {
    const handleSubmit = async () => {
      await postData({
        method: "post",
        url: "/user/token",
        data: {
          JWT_TOKEN: cookies.JWT_TOKEN,
        },
      });
    };

    if (cookies.JWT_TOKEN) {
      handleSubmit();
    }
  }, []);

  if (!cookies.JWT_TOKEN) {
    return false;
  }

  if (error && error === "invalid token") {
    removeCookie(TOKEN_KEY);
    return false;
  }

  return data && data.data.message === "success" && true;
};

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const login = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};
