import { Request, Response } from "express";
import Movie from "../models/movie.model";

// List all movies
export const listMovies = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch movies",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Search for movies by title or genre
export const searchMovies = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { q } = req.query;
  try {
    const movies = await Movie.find({
      $or: [
        { title: new RegExp(q as string, "i") },
        { genre: new RegExp(q as string, "i") },
      ],
    });
    res.json(movies);
  } catch (error) {
    res.status(500).json({
      error: "Failed to search movies",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Add a new movie
export const addMovie = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, genre, rating, streamingLink } = req.body;

    // Validate input
    if (!title || !genre || !rating || !streamingLink) {
      res.status(400).json({
        error:
          "Missing required fields: title, genre, rating, or streamingLink",
      });
      return;
    }

    const newMovie = await Movie.create({
      title,
      genre,
      rating,
      streamingLink,
    });
    res.status(201).json(newMovie);
  } catch (error) {
    res.status(400).json({
      error: "Failed to add movie",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Update an existing movie
export const updateMovie = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedMovie) {
      res.status(404).json({ error: "Movie not found" });
      return;
    }

    res.json(updatedMovie);
  } catch (error) {
    res.status(400).json({
      error: "Failed to update movie",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Delete a movie
export const deleteMovie = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const deletedMovie = await Movie.findByIdAndDelete(id);

    if (!deletedMovie) {
      res.status(404).json({ error: "Movie not found" });
      return;
    }

    res.json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({
      error: "Failed to delete movie",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
