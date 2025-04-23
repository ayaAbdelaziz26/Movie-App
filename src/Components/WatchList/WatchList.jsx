import React from 'react';
import moviePoster from '../../assets/black.jpg'; 
import './WatchList.css';


const WatchList = () => {
  const dummyData = new Array(4).fill({
    title: 'Black Widow',
    date: 'Sep 25, 2017',
    rating: 4,
    votes: 9288,
    description: 'Natasha Romanoff, also known as Black Widow, confronts the darker parts of her ledger when a dangerous conspiracy with ties to her past arises. Pursued by....'
  });

  return (
    <div className="watchlist-container">
      <h2>Watch list</h2>
      <div className="watchlistt-grid">
        {dummyData.map((movie, index) => (
          <div className="moviee-card" key={index}>
            <img src={moviePoster} alt="Moviee Posterr" className="moviee-posterr" />
            <div className="moviee-info">
              <div className="moviee-title">
                <h3>{movie.title}</h3>
                <span className="favoritee">💛</span>
              </div>
              <p className="moviee-date">{movie.date}</p>
              <div className="moviee-rating">
                {'★'.repeat(movie.rating)}{'☆'.repeat(5 - movie.rating)}
                <span>{movie.votes}</span>
              </div>
              <p className="moviee-description">{movie.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WatchList;
