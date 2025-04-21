import React from 'react'
import './navbar.css'
import arrow from '../../assets/arrow.png'
import heart from '../../assets/heart.png'

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="navbar-left">
        Movie App
      </div>

      <div className="navbar-right">
        <div className='navbar-lang'>
            <p>En</p>
             <img src={arrow} alt="" />
            </div>

            <div className="navbar-watchlist">
                <img src={heart} alt="" />
                <p>watchlist</p>
            </div>
      </div>
    </div>
  )
}

export default Navbar
