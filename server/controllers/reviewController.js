import express from 'express';
import Review from '../models/Review.js';

const createReview = async (req, res) => {
  const { movieId, reviewText, rating } = req.body;
  try {
    const newReview = new Review({
      movieId,
      reviewText,
      rating,
      userId: req.user.id,
      username: req.user.username
    });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

const getReviewsByMovie = async (req, res) => {
  try {
    const reviews = await Review.find({ movieId: req.params.movieId });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

const updateReview = async (req, res) => {
  const { reviewText, rating } = req.body;
  try {
    const review = await Review.findById(req.params.id);
    if (review.userId.toString() !== req.user.id) return res.status(403).json({ msg: 'Not authorized' });

    review.reviewText = reviewText;
    review.rating = rating;
    await review.save();
    res.json(review);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
   // console.log(review);
    if (review.userId.toString() !== req.user.id) return res.status(403).json({ msg: 'Not authorized' });

    await review.deleteOne({reviewId: req.params.id});
    res.json({ msg: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

const voteReview = async (req, res) => {
  const { voteType } = req.body;
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ msg: 'Review not found' });

    // Remove any previous vote
    review.upvotes = review.upvotes.filter(u => u.toString() !== req.user.id);
    review.downvotes = review.downvotes.filter(u => u.toString() !== req.user.id);

    if (voteType === 'upvote') {
      review.upvotes.push(req.user.id);
    } else if (voteType === 'downvote') {
      review.downvotes.push(req.user.id);
    }

    await review.save();
    res.json(review);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

export {
    createReview,
    getReviewsByMovie,
    updateReview,
    deleteReview,
    voteReview
};
