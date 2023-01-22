import {useState} from 'react'
import useGetAxios from '../../hooks/useGetAxios';
import {setListStore } from '../../Store/state';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert'

export default function Buscador({clas , action}) {

    const dispatch = useDispatch();
    const navigate  = useNavigate ();
    const {data} = useGetAxios("http://localhost:4000/api/products");
    const [search , SetSearch] = useState("");


    const HandleSearch =(e) => {
        e.preventDefault()
        const result = data.filter((item) =>{/* if((item.name||item.description).includes(search)){return item}} */
        return item.description.toLowerCase().includes(search.toLowerCase())})
        if(result.length > 0){
            action()   
            dispatch(setListStore(result)) 
        }else{
        swal("Oops...", "no se encontraron productos!", "info")
        .then((value) => {
                navigate("/") 
              })
        }
        
        return navigate("/")
      }
    
      const hamdldeChange = (e) => {
        SetSearch(e.target.value)
      }

  return (
    <div className='container_search_input'>
          <form 
            className = {clas}
            onSubmit={HandleSearch}>
                <input
                type="search" placeholder='Search Product...'
                required 
                value={search}
                onChange={hamdldeChange}/>
            </form>
    </div>
  )
}
