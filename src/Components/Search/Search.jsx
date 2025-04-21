import React from 'react'
import './search.css'

const Search = () => {
  return (
    <div className='search'>
      <h2>Welcome to our movie app</h2>
      <p>Millions of movies, TV shows and people to discover. Explore now.</p>

      <div className='search-box'>
        <input type="text" placeholder='Search and explore...'/>
        <button>Search</button>
      </div>
    </div>
  )
}

export default Search
