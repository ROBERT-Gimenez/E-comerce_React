import { useState } from "react";
import axios from "axios";

const useAxiosPost = (url, postData) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
  
    const makePostRequest = async () => {
      setLoading(true);
      try {
        const response = await axios.post(url, postData);
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
  
    return [data, loading, error, makePostRequest];
  };
  
  export default useAxiosPost;