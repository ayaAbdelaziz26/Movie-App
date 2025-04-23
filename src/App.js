import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Movie_Details from './Pages/Movie-Details/Movie-Details';
import WatchList from "./Components/WatchList/WatchList.jsx";

const Home = lazy(() => import('./Pages/Home/Home'));

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Suspense fallback={<div style={{padding:'20px'}}>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie-details/:id" element={<Movie_Details />} />
            <Route path="/watchlist" element={<WatchList/>}/>
            </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;

