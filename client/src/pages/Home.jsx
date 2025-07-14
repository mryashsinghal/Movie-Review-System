import { useState } from 'react';
import MovieCard from '../components/MovieCard';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchMovies = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await axios.get(`https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${import.meta.env.VITE_OMDB_API_KEY}`);
      if (res.data && res.data.Search) {
        setResults(res.data.Search);
      } else {
        setResults([]);
      }
    } catch (error) {
      setResults([]);
    }
    setLoading(false);
  };

  return (
    <div className="home-bg">
      <div className="home-intro">
        <h1 className="home-title">Welcome to MovieReview!</h1>
        <p className="home-desc">
          Discover, search, and review your favorite movies. Find trending films, read user reviews, and share your own thoughts. Start exploring now!
        </p>
      </div>
      <div className="search-section">
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search movies..."
          className="search-input"
          onKeyDown={e => e.key === 'Enter' && searchMovies()}
        />
        <button className="search-btn" onClick={searchMovies} disabled={loading}>
          {loading ? <span className="loader"></span> : 'Search'}
        </button>
      </div>
      <div className="movie-list">
        {results.length === 0 && !loading && (
          <div className="no-results">No movies found. Try searching for something else!</div>
        )}
        {results.map(movie => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Home;