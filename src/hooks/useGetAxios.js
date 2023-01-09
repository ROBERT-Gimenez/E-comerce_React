import axios from 'axios'
import { useEffect , useState } from 'react';

export default function useGetAxios(url) {

    const [data , setData] = useState(null);
    const [loading , setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        axios.get(url)
        .then((data)=>{
            setData(data.data.data);
            setLoading(false);
        });
    } , [url]); 



  return {data , loading};
}
