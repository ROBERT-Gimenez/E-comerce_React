import axios from 'axios'
import { useEffect , useState } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { setListStore } from '../Store/state';


export default function useGetAxios(url) {
    const dispatch = useDispatch();

    const [data , setData] = useState(null);
    const [loading , setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        axios.get(url)
        .then((data)=>{
            setData(data.data.data);
            setLoading(false);
            /* dispatch(setListStore(data.data.data)) */

        });
    } , [url]); 
   /*  useEffect(() => {
        setLoading(true);
    async function esperar(){
        axios.get("http://localhost:4000/api/products")
        .then((data)=>{
            setData(data.data);
            setLoading(false);
           
            
        });
       }
       esperar()
} , [url]); */


  return {data , loading};
}
