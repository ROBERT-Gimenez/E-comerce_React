import { useState , useEffect } from "react";
import axios from "axios";

const useAxiosPUT = () => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [url, setUrl] = useState(null);
    const [postData, setPostData] = useState(null);
  
    const makePostRequest = async () => {
      setIsLoading(true);
      try {
        const res = await axios.put(url, postData);
        setResponse(res.data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    useEffect(() => {
        let isMounted = true;
        if (isMounted && url && postData) {
            makePostRequest();
        }
        return () => {
          isMounted = false;
        };
    }, [url, postData]);
  
    return [response, error, isLoading, setUrl , setPostData];
  };
export default useAxiosPUT;