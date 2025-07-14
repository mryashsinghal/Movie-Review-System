

# MovieVerse - A Community-Driven Movie Review System

**MovieVerse** is a full-stack web application that allows users to search for movies using the OMDb API and contribute community reviews. Authenticated users can write, edit, delete reviews, and engage through voting. The platform also displays aggregate ratings per movie based on user reviews.

---

## Features

- Movie search using OMDb API
- User authentication (register/login using JWT)
- Add, edit, and delete reviews
- Vote on reviews (upvote/downvote)
- Aggregate rating per movie
- Responsive UI using custom CSS (no frameworks)

---

## Tech Stack

### Frontend
- React (Vite)
- React Router
- Axios
- Custom CSS

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- Bcrypt for password hashing
- CORS

### External API
- [OMDb API](https://www.omdbapi.com/) for movie data

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/mryashsinghal/Movie-Review-System.git
cd Movie-Review-System
````

---

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside the `server/` folder with the following content:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend:

```bash
node server.js
```

The backend will run on `http://localhost:5000`.

---

### 3. Frontend Setup

```bash
cd ../client
npm install
```

Create a `.env` file inside the `client/` folder:

```env
VITE_OMDB_KEY=your_omdb_api_key
```

Start the frontend:

```bash
npm run dev
```

The frontend will run on `http://localhost:5173`.

---

## API Endpoints

### Authentication

* `POST /api/auth/register` – Register a new user
* `POST /api/auth/login` – Authenticate user and return JWT

### Reviews

* `GET /api/reviews/:movieId` – Get all reviews for a movie
* `POST /api/reviews` – Create a review (requires auth)
* `PUT /api/reviews/:id` – Edit a review (requires auth)
* `DELETE /api/reviews/:id` – Delete a review (requires auth)
* `POST /api/reviews/vote/:id` – Upvote or downvote a review (requires auth)

---

## Folder Structure Overview

### Backend

```
server/
├── controllers/
├── middleware/
├── models/
├── routes/
├── config/
├── server.js
└── .env
```

### Frontend

```
client/
├── src/
│   ├── components/
│   ├── pages/
│   ├── context/
│   ├── services/
│   ├── App.jsx
│   └── main.jsx
├── public/
└── .env
```

---

## Deployment

The application can be deployed as follows:

* **Frontend:** Vercel / Netlify
* **Backend:** Render / Railway
* **Database:** MongoDB Atlas

Update API base URLs and environment variables during deployment.

---

## Contribution

If you'd like to contribute, feel free to fork the repository and submit a pull request. For major changes, please open an issue to discuss your ideas first.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Contact

Developed by [Yash Singhal](https://github.com/mryashsinghal). For feedback or suggestions, please create an issue in the repository.
