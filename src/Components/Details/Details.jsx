import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../axiosInstance";
import full_heart from "../../assets/full_heart.png"; // استيراد صورة القلب المملوء
import empty_heart from "../../assets/empty-heart.png"; // استيراد صورة القلب الفارغ
import "./Details.css";
import { useSelector } from "react-redux"; // استيراد useSelector

export const Details = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  // استرجاع watchlist من redux
  const watchlist = useSelector((state) => state.input.watchlist);

  useEffect(() => {
    axiosInstance
      .get(`/movie/${id}`)
      .then((response) => {
        setMovie(response.data);
      })
      .catch((error) => {
        console.error("Error fetching movie data:", error);
      });
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  // تحقق مما إذا كان الفيلم مضافًا إلى الـ watchlist
  const isInWatchlist = watchlist.some((item) => item.id === movie.id);

  return (
    <div className="details-card">
      <div className="details-poster-wrapper">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="details-poster"
        />
      </div>
      <div className="details-info">
        <div className="details-header">
          <h1 className="details-title">{movie.original_title}</h1>
          {/* استخدام الصور بدلاً من FontAwesome */}
          <img
            src={isInWatchlist ? full_heart : empty_heart}
            alt="heart"
            className="fav-icon"
            style={{ height: "30px", cursor: "pointer" }}
          />
        </div>
        <p className="details-release">
          {new Date(movie.release_date).toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          })}
        </p>

        <div className="rating">
          {[...Array(5)].map((_, i) => (
            <div key={i} className={`star-icon ${i < Math.round(movie.vote_average / 2) ? "filled" : ""}`} />
          ))}
          <span>{movie.vote_count}</span>
        </div>

        <p className="details-overview">{movie.overview}</p>

        <div className="movie-type">
          {movie.genres.map((genre) => (
            <span key={genre.id} className="details-genre">
              {genre.name}
            </span>
          ))}
        </div>

        <div className="about-movie">
          <span className="duration">
            <strong>Duration:</strong> {Math.floor(movie.runtime / 60)}h{" "}
            {movie.runtime % 60}m
          </span>

          <span className="languages">
            <strong>Languages:</strong>{" "}
            {movie.spoken_languages.map((lang) => lang.english_name).join(", ")}
          </span>
        </div>

        <button
          className="website-btn"
          onClick={() => window.open(movie.homepage, "_blank")}
        >
          Website
        </button>
      </div>
    </div>
  );
};
