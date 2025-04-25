import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../axiosInstance";
import "./Recommendations.css";
import { useNavigate } from "react-router-dom";
import { addToWatchlist, removeFromWatchlist } from '../../redux/inputslice';
import empty_heart from '../../assets/empty-heart.png'; // الصورة الفارغة
import full_heart from '../../assets/full_heart.png'; // الصورة المملوءة
import { useDispatch, useSelector } from "react-redux";

export const Recommendations = () => {
  const { id } = useParams();
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const watchlist = useSelector((state) => state.input.watchlist);

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
    <div className="list-containerr">
      <h2>Recommendations</h2>
      <div className="list-gridd">
        {movies.map((movie) => (
          <div
            className="movie-cardd"
            key={movie.id}
            onClick={() => navigate(`/movie-details/${movie.id}`)}
            style={{ cursor: 'pointer' }}
          >
            <div className="poster-wrapperr">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="movie-posterr"
              />
              <div className="rating-circlee">
                {Math.round(movie.vote_average * 10)}%
              </div>
            </div>
            <div className="moviee-info">
              <p className="moviee-title">{movie.original_title}</p>
              <div className="moviee-date-wish">
                <p className="moviee-date">
                  {new Date(movie.release_date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </p>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation(); // إيقاف انتشار الحدث
                    const isInWatchlist = watchlist.some((item) => item.id === movie.id);
                    if (isInWatchlist) {
                      dispatch(removeFromWatchlist(movie.id));
                    } else {
                      dispatch(addToWatchlist(movie));
                    }
                  }}
                  className="heart-btn"
                >
                  <img
                    src={watchlist.some((item) => item.id === movie.id) ? full_heart : empty_heart}
                    alt="heart"
                    style={{ height: '20px', cursor: 'pointer' }}
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
