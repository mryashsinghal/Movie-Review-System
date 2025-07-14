import { Link } from 'react-router-dom';
import './MovieCard.css';

const MovieCard = ({ movie }) => (
  <div className="movie-card">
    <div className="movie-card-poster">
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "/no-poster.png"}
        alt={movie.Title}
        className="movie-card-img"
      />
    </div>
    <div className="movie-card-info">
      <h4 className="movie-card-title">{movie.Title}</h4>
      <p className="movie-card-year">{movie.Year}</p>
      <Link to={`/movie/${movie.imdbID}`} className="movie-card-link">
        View Details
      </Link>
    </div>
  </div>
);

export default MovieCard;