import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getReviews, createReview } from '../services/api';
import { useAuth } from '../context/AuthContext';
import ReviewItem from '../components/ReviewItem';
import './MovieDetail.css';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [reviews, setReviews] = useState([]);
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);
  const { token } = useAuth();
  const [averageRating, setAverageRating] = useState(null);

  const fetchData = async () => {
    const res = await axios.get(`https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&i=${id}`);
    setMovie(res.data);
    const reviewData = await getReviews(id);
    setReviews(reviewData.data);

    if (reviewData.data.length > 0) {
    const total = reviewData.data.reduce((acc, curr) => acc + curr.rating, 0);
    setAverageRating((total / reviewData.data.length).toFixed(1));
  } else {
    setAverageRating(null);
  }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createReview({ movieId: id, reviewText: text, rating }, token);
    setText('');
    setRating(5);
    fetchData();
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="movie-detail-bg">
      <div className="movie-detail-card">
        <div className="movie-detail-poster">
          <img
            src={movie.Poster !== "N/A" ? movie.Poster : "/no-poster.png"}
            alt={movie.Title}
            className="movie-detail-img"
          />
          {averageRating ? (
            <div className="movie-average-rating">
              <strong>Community Rating:</strong>
              <span>
                {averageRating}
                <span className="star">★</span>
                <span className="empty">{'☆'.repeat(5 - Math.round(averageRating))}</span>
              </span>
    
            </div>
          ) : (
            <div className="movie-average-rating" style={{background: 'rgba(255,255,255,0.13)', color: '#fff'}}>
              <em>No ratings yet.</em>
            </div>
          )}
        </div>
        <div className="movie-detail-info">
          <h2 className="movie-detail-title">{movie.Title}</h2>
          <p className="movie-detail-meta">
            <span>{movie.Year}</span> | <span>{movie.Genre}</span> | <span>{movie.Runtime}</span>
          </p>
          <p className="movie-detail-plot">{movie.Plot}</p>
          <div className="movie-detail-extra">
            <span>IMDB: {movie.imdbRating}</span>
            <span>Director: {movie.Director}</span>
          </div>
        </div>
      </div>

      <div className="movie-detail-reviews">
        <h3 className="reviews-title">User Reviews</h3>
        {reviews.length === 0 && (
          <div className="no-reviews">No reviews yet. Be the first to review this movie!</div>
        )}
        {reviews.map(r => (
          <ReviewItem key={r._id} review={r} refresh={fetchData} />
        ))}
      </div>

      {token && (
        <form className="review-form" onSubmit={handleSubmit}>
          <h4 className="review-form-title">Write a Review</h4>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Share your thoughts..."
            className="review-textarea"
            required
            minLength={5}
          />
          <div className="review-rating-row">
            <label htmlFor="rating" className="review-rating-label">Rating:</label>
            <input
              type="number"
              id="rating"
              max="5"
              min="1"
              value={rating}
              onChange={e => setRating(Number(e.target.value))}
              className="review-rating-input"
            />
            <span className="review-stars">
              {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
            </span>
          </div>
          <button type="submit" className="review-submit-btn">Submit Review</button>
        </form>
      )}
    </div>
  );
};

export default MovieDetail;