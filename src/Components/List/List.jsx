import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; //  Add this
import axiosInstance from '../../axiosInstance';
import './list.css';
<<<<<<< HEAD
// import empty_heart from '../../assets/empty-heart.png';
import { useDispatch, useSelector } from "react-redux";
import { addToWatchlist,removeFromWatchlist  } from '../../redux/inputslice'
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const List = () => {
  const [movies, setMovies] = useState([]);
  const dispatch = useDispatch();
  const watchlist = useSelector((state) => state.input.watchlist);


=======
import empty_heart from '../../assets/empty-heart.png';
import { useNavigate } from 'react-router-dom';
const List = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
>>>>>>> 1a783115cd320e516bf927e618adc48aa3b114c8
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
<button
  onClick={(e) => {
    e.preventDefault();
    const isInWatchlist = watchlist.some((item) => item.id === movie.id);
    if (isInWatchlist) {
      dispatch(removeFromWatchlist(movie.id));
    } else {
      dispatch(addToWatchlist(movie));
    }
  }}
  className="heart-btn"
>
  <FontAwesomeIcon
    icon={watchlist.some((item) => item.id === movie.id) ? solidHeart : regularHeart}
    style={{ color: watchlist.some((item) => item.id === movie.id) ? 'gold' : '#999' }}
  />
</button>

                  </div>
              </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default List;
