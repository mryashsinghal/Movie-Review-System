import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const register = (data) => API.post('/auth/register', data);
export const login = (data) => API.post('/auth/login', data);

export const createReview = (data, token) =>
  API.post('/reviews', data, { headers: { Authorization: token } });

export const getReviews = (movieId) => API.get(`/reviews/${movieId}`);

export const editReview = (id, data, token) =>
  API.put(`/reviews/${id}`, data, { headers: { Authorization: token } });

export const deleteReview = (id, token) =>
  API.delete(`/reviews/${id}`, { headers: { Authorization: token } });

export const voteReview = (id, type, token) =>
  API.post(`/reviews/vote/${id}`, { voteType: type }, { headers: { Authorization: token } });
