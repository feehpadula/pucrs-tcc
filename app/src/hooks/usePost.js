import { useState, useCallback } from "react";
import axios from "../services/Api";

export const usePost = (params) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const postData = useCallback(async (requestData) => {
    setData(null);
    setError(null);

    await axios(requestData)
      .then((res) => {
        setData(res);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  }, []);

  return { postData, data, isLoading, error };
};
