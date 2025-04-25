import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../axiosInstance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faHeart, faLink } from "@fortawesome/free-solid-svg-icons";
import "./Details.css";
// import { useDispatch, useSelector } from "react-redux";
// import { addToWatchlist } from '../../redux/inputslice'

export const Details = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
    // const dispatch = useDispatch();


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
          <FontAwesomeIcon icon={faHeart} className="fav-icon" />
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
            <FontAwesomeIcon
              key={i}
              icon={faStar}
              className={`star-icon ${
                i < Math.round(movie.vote_average / 2) ? "filled" : ""
              }`}
            />
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

        {/* <div className="prod-company-wrapper">
          <img
            src="../../../public/company.png"
            alt={movie.title}
            className="prod-company"
          />
        </div> */}

        <button
          className="website-btn"
          onClick={() => window.open(movie.homepage, "_blank")}
        >
          <FontAwesomeIcon icon={faLink} style={{ marginRight: "8px" }} />
          Website
        </button>
      </div>
    </div>
  );
};
