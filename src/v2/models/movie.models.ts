import { Schema, model, Document } from 'mongoose';

export interface IMovie extends Document {
  title: string;
  genres: string[];
  synopsis?: string;
  releaseDate?: Date;
  durationMin: number;
}

const MovieSchema = new Schema({
  title: { type: String, required: true, minlength: 1, maxlength: 200 },
  genres: [{ type: String, required: true, minlength: 1, maxlength: 30 }],
  synopsis: { type: String },
  releaseDate: { type: Date },
  durationMin: { type: Number, required: true, min: 1, max: 600 }
}, { timestamps: true });

MovieSchema.index({ title: 1 });
MovieSchema.index({ genres: 1 });

const MovieModel = model<IMovie>('Movie', MovieSchema);
export default MovieModel;
