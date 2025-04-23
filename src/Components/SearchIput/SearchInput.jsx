import { useContext, useState } from 'react';
import './SearchInput.css';
import { useDispatch, useSelector } from 'react-redux';
import { getResults, setInput } from '../../redux/inputslice';
import axiosInstance from '../../axiosInstance';
const SearchInput=(props)=>{
    const dispatch=useDispatch();
    const input=useSelector((state)=>state.input.value)
   
    function handelinput(e)
    {
      dispatch(setInput(e.target.value))
      
    }
    function handelsubmit()
    {
      axiosInstance.get('search/movie',{
        params: {
          query: input,
          api_key: '082ccab2f184d41322dc316b5860ef80', // API Key
        }
      }).then((res)=>{
        const filtered = res.data.results.filter((item) => {
          return item.backdrop_path !== null && item.original_title !== null;
        });
        dispatch(getResults(filtered))
      });
    }
    return (
        <>
         <div id="search">
          <input type="text" placeholder='Search and explore...' onChange={handelinput}/>
          <button onClick={handelsubmit}>Search</button>
         </div>
        </>
    )
}
export default SearchInput;