import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; //  Add this
import axiosInstance from '../../axiosInstance';
import './list.css';
import empty_heart from '../../assets/empty-heart.png';
import { useNavigate } from 'react-router-dom';
const List = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axiosInstance.get('/movie/now_playing', {
      params: {
        language: 'en-US',
        region: 'US',
      },
    })
      .then(res => {
        setMovies(res.data.results);
        console.log('success');
      })
      .catch((err) => {
        console.error('Failed to fetch movies:', err);
      });
  }, []);

  return (
    <div className="list-container">
      <h2>Now Playing</h2>
      <div className="list-grid">
        {movies.map((movie) => (
            <div className="movie-card"
            key={movie.id}
            onClick={() => navigate(`/movie-details/${movie.id}`)}
            style={{ cursor: 'pointer' }}>
              <div className="poster-wrapper">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="movie-poster"
                />
                <div className="rating-circle">{Math.round(movie.vote_average * 10)}%</div>
              </div>
              <div className="movie-info">
                <p className="movie-title">{movie.original_title}</p>
                <div className="movie-date-wish">
                  <p className="movie-date">
                    {new Date(movie.release_date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: '2-digit',
                      year: 'numeric',
                    })}
                  </p>
 <Link to="/watchlist">
    <img src={empty_heart} alt="wishlist icon" />
  </Link>
                  </div>
              </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default List;
