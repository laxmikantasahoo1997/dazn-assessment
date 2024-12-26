import mongoose, { Schema, Document } from "mongoose";

interface IMovie extends Document {
  title: string;
  genre: string;
  rating: number;
  streamingLink: string;
}

const movieSchema = new Schema<IMovie>({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  rating: { type: Number, required: true, min: 0, max: 10 },
  streamingLink: { type: String, required: true },
});

export default mongoose.model<IMovie>("Movie", movieSchema);
