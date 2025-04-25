import React from 'react'
import './search.css'
import { useDispatch, useSelector } from 'react-redux'
import { getResults, setInput } from '../../redux/inputslice'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../axiosInstance'

const Search = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate();
  const input=useSelector(state=>state.input.value)
  function handelinput(e)
  {
    dispatch(setInput(e.target.value))
  }
  function handelclick()
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
      console.log(filtered)
      dispatch(getResults(filtered))
    });
    navigate('/search')
  }
  return (
    <div className='search'>
      <h2>Welcome to our movie app</h2>
      <p>Millions of movies, TV shows and people to discover. Explore now.</p>

      <div className='search-box'>
        <input type="text" placeholder='Search and explore...' onChange={handelinput}/>
        <button onClick={handelclick}>Search</button>
      </div>
    </div>
  )
}

export default Search
