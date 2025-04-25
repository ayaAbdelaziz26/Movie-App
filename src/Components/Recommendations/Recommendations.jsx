import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../axiosInstance";
import { Link } from 'react-router-dom'; //  Add this
// import empty_heart from '../../assets/empty-heart.png';
import "./Recommendations.css";
<<<<<<< HEAD
import { useDispatch, useSelector } from "react-redux";
import { addToWatchlist,removeFromWatchlist } from '../../redux/inputslice'
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

=======
import { useNavigate } from "react-router-dom";
>>>>>>> 1a783115cd320e516bf927e618adc48aa3b114c8

export const Recommendations = () => {
  const { id } = useParams();
  const [movies, setMovies] = useState([]);
<<<<<<< HEAD
    const dispatch = useDispatch();
    const watchlist = useSelector((state) => state.input.watchlist);

  
=======
  const navigate = useNavigate();
>>>>>>> 1a783115cd320e516bf927e618adc48aa3b114c8

  useEffect(() => {
    axiosInstance
      .get(`/movie/${id}/recommendations`, {
        params: {
          language: 'en-US',
          region: 'US',
        },
      })
      .then((res) => {
        const limitedMovies = res.data.results.slice(0, 5);
        setMovies(limitedMovies);
        console.log('Fetched 6 recommended movies successfully');
      })
      .catch((err) => {
        console.error('Failed to fetch movies:', err);
      });
  }, [id]);

  if (!movies) return <div>Loading...</div>;
  return (
    
    <div className="list-container">
    <h2>Recommendations</h2>
    <div className="list-grid">
<<<<<<< HEAD
      {movies.map((movie) => (
        <Link to={`/movie-details/${movie.id}`} key={movie.id} className="movie-card-link">
          <div className="movie-card">
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
=======
    {movies.map((movie) => (
  <div
    className="movie-card"
    key={movie.id}
    onClick={() => navigate(`/movie-details/${movie.id}`)}
    style={{ cursor: 'pointer' }}
  >
    <div className="poster-wrapper">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="movie-poster"
      />
      <div className="rating-circle">
        {Math.round(movie.vote_average * 10)}%
      </div>
    </div>
    <div className="movie-info">
      <p className="movie-title">{movie.original_title}</p>
      <div className="movie-date-wish">
        <p className="movie-date">
          {new Date(movie.release_date).toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          })}
        </p>
        <Link to="/watchlist">
          <img src={empty_heart} alt="wishlist icon" />
>>>>>>> 1a783115cd320e516bf927e618adc48aa3b114c8
        </Link>
      </div>
    </div>
  </div>
))}

    </div>
  </div>
  )
}
