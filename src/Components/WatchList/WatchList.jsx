import React from 'react';
import './WatchList.css';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import emptyImg from '../../assets/empty-watchlist.png'; // تأكد إنك تحط الصورة دي في الـ assets

const WatchList = () => {
  const watchlist = useSelector((state) => state.input.watchlist);

  return (
    <div className="watchlist-container">
      <h2>Watch List</h2>
      {watchlist.length === 0 ? (
        <div className="empty-watchlist">
          <img src={emptyImg} alt="No movies" className="empty-img" />
          <p>Your watchlist is empty!</p>
          <Link to="/">
            <button className="back-home-btn">Back to Home</button>
          </Link>
        </div>
      ) : (
        <div className="watchlistt-grid">
          {watchlist.map((movie, index) => (
            <div className="moviee-card" key={index}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="moviee-posterr"
              />
              <div className="moviee-info">
                <div className="moviee-title">
                  <h3>{movie.original_title}</h3>
                  <span className="favoritee">💛</span>
                </div>
                <p className="moviee-date">{new Date(movie.release_date).toLocaleDateString()}</p>
                <div className="moviee-rating">
                  {'★'.repeat(Math.round(movie.vote_average / 2))}
                  {'☆'.repeat(5 - Math.round(movie.vote_average / 2))}
                  <span>{movie.vote_count}</span>
                </div>
                <p className="moviee-description">{movie.overview}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchList;
