import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import SearchPage from './Pages/Search/Search';

const Home = lazy(() => import('./Pages/Home/Home'));

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Suspense fallback={<div style={{padding:'20px'}}>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/search' element={<SearchPage/>}/>
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;

