import React from 'react'
import './navbar.css'
import arrow from '../../assets/arrow.png'
import heart from '../../assets/heart.png'
import { Link } from 'react-router-dom';

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
                 <Link to="/watchlist" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
    <img src={heart} alt="" />
    <p>watchlist</p>
  </Link>
            </div>
      </div>
    </div>
  )
}

export default Navbar
