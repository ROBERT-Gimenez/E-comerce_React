import axios from 'axios'
import { useEffect , useState } from 'react';

export default function useGetAxios(url) {
    const [data , setData] = useState(null);
    const [loading , setLoading] = useState(true);

    /* useEffect(() => {
        setLoading(true);
        axios.get("http://localhost:4000/api/products")
        .then((data)=>{
            setData(data.data);
            setLoading(false);
        });
    } , [url]); */
    useEffect(() => {
        setLoading(true);
    async function esperar(){
        axios.get("http://localhost:4000/api/products")
        .then((data)=>{
            setData(data.data);
            setLoading(false);
           
            
        });
       }
       esperar()
} , [url]);


  return {data , loading};
}
