import express from "express";
import {
  listMovies,
  searchMovies,
  addMovie,
  updateMovie,
  deleteMovie,
} from "../controllers/movie.controller";
import { verifyAdmin } from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/movies", listMovies); // List all movies
router.get("/search", searchMovies); // Search movies by title/genre
router.post("/movies", verifyAdmin, addMovie); // Add a new movie
router.put("/movies/:id", verifyAdmin, updateMovie); // Update movie by ID
router.delete("/movies/:id", verifyAdmin, deleteMovie); // Delete movie by ID

export default router;
