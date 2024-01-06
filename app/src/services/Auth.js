import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { usePost } from "../hooks/usePost";

export const TOKEN_KEY = "JWT_TOKEN";

export const IsAuthenticated = () => {
  /* eslint-disable */
  const [setCookie, removeCookie] = useCookies([TOKEN_KEY]);
  /* eslint-disable */

  const token = GetToken();
  let { postData, data, isLoading, error } = usePost();

  useEffect(() => {
    const validateToken = async () => {
      await postData({
        method: "post",
        url: "/user/token",
        data: {
          JWT_TOKEN: token,
        },
      });
    };

    if (token) {
      validateToken();
    }
  }, []);

  if (!token) {
    return false;
  }

  if (error) {
    RemoveToken();
    return false;
  }

  return data && data.data.message === "success" && data.data.rights;
};

export const GetToken = () => {
  /* eslint-disable */
  const [cookies] = useCookies([TOKEN_KEY]);
  /* eslint-disable */

  if (cookies.JWT_TOKEN && cookies.JWT_TOKEN !== "undefined") {
    return cookies.JWT_TOKEN;
  }
};

export const RemoveToken = () => {
  /* eslint-disable */
  const [cookies, removeCookie] = useCookies([TOKEN_KEY]);
  /* eslint-disable */

  removeCookie(TOKEN_KEY);

  window.location.href = "/";
};
