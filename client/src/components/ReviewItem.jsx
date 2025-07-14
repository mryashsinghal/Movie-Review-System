import { useAuth } from '../context/AuthContext';
import { deleteReview, voteReview } from '../services/api';
import './ReviewItem.css';

const ReviewItem = ({ review, refresh }) => {
  const { token, username } = useAuth();

  const handleDelete = async () => {
    await deleteReview(review._id, token);
    refresh();
  };

  const handleVote = async (type) => {
    await voteReview(review._id, type, token);
    refresh();
  };

  return (
    <div className="review-item">
      <div className="review-header">
        <span className="review-user">{review.username}</span>
        <span className="review-rating">
          {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
        </span>
      </div>
      <div className="review-text">{review.reviewText}</div>
      <div className="review-actions">
        <button
          className="review-btn upvote"
          onClick={() => handleVote('upvote')}
          title="Upvote"
        >
          👍 <span className="vote-count">{review.upvotes.length}</span>
        </button>
        <button
          className="review-btn downvote"
          onClick={() => handleVote('downvote')}
          title="Downvote"
        >
          👎 <span className="vote-count">{review.downvotes.length}</span>
        </button>
        {review.username === username && (
          <button
            className="review-btn delete"
            onClick={handleDelete}
            title="Delete Review"
          >
            🗑
          </button>
        )}
      </div>
    </div>
  );
};

export default ReviewItem;