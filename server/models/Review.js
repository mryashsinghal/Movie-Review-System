import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  userId:    { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  username:  { type: String },
  movieId:   { type: String, required: true },
  reviewText:{ type: String, required: true },
  rating:    { type: Number, required: true },
  upvotes:   [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  downvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

export default mongoose.model('Review', reviewSchema);