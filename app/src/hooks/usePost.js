import { useState, useCallback } from "react";
import axios from "axios";

export const usePost = (params) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const postData = useCallback(async (requestData) => {
    await axios(requestData)
      .then((res) => {
        setData(res);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.error);
      });
  }, []);

  return { postData, data, isLoading, error };
};
