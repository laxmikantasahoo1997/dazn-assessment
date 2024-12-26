import supertest from "supertest";
import app from "../app"; // Import the Express app
import mongoose from "mongoose";
import Movie from "../models/movie.model";
import connectDB from "../config/database";

// Setup for testing
const request = supertest(app);

beforeAll(async () => {
  // Connect to a temporary test database (use an in-memory database if needed)
  await connectDB();
});

afterAll(async () => {
  await mongoose.connection.close(); // Close the connection after tests
});

describe("Movie API Endpoints", () => {
  // Test the POST /movies endpoint
  it("should create a new movie", async () => {
    const newMovie = {
      title: "ABC",
      genre: "sce",
      rating: 8.7,
      streamingLink: "http://example.com/abc",
    };

    const response = await request
      .post("/api/movies")
      .set("user-role", "admin")
      .send(newMovie);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("_id");
    expect(response.body.title).toBe("ABC");
    expect(response.body.genre).toBe("sce");
    expect(response.body.rating).toBe(8.7);
    expect(response.body.streamingLink).toBe("http://example.com/abc");
  });

  // Test the GET /movies endpoint
  it("should fetch all movies", async () => {
    const response = await request.get("/api/movies");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  // Test the GET /search endpoint with a query
  it("should search for a movie by title or genre", async () => {
    const response = await request.get("/api/search?q=ABC");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0].title).toBe("ABC");
  });

  // Test the PUT /movies/:id endpoint
  it("should update an existing movie", async () => {
    const movie = await Movie.create({
      title: "XYZ",
      genre: "cdf",
      rating: 9,
      streamingLink: "http://example.com/xyz",
    });

    const updatedMovie = {
      rating: 9.5,
    };

    const response = await request
      .put(`/api/movies/${movie._id}`)
      .set("user-role", "admin")
      .send(updatedMovie);

    expect(response.status).toBe(200);
    expect(response.body.rating).toBe(9.5);
  });

  // Test the DELETE /movies/:id endpoint
  it("should delete a movie", async () => {
    const movie = await Movie.create({
      title: "TYU",
      genre: "uiu",
      rating: 8,
      streamingLink: "http://example.com/tyu",
    });
    const response = await request
      .delete(`/api/movies/${movie._id}`)
      .set("user-role", "admin");

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Movie deleted successfully");
  });
});
