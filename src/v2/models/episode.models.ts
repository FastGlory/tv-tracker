import { Schema, model, Document } from 'mongoose';

export interface IEpisode extends Document {
  seriesId: Schema.Types.ObjectId;
  seasonId: Schema.Types.ObjectId;
  epNo: number;
  title: string;
  durationMin: number;
}

const EpisodeSchema = new Schema({
  seriesId: { type: Schema.Types.ObjectId, ref: 'Series', required: true },
  seasonId: { type: Schema.Types.ObjectId, ref: 'Season', required: true },
  epNo: { type: Number, required: true, min: 1 },
  title: { type: String, required: true, minlength: 1, maxlength: 200 },
  durationMin: { type: Number, required: true, min: 1, max: 300 }
}, { timestamps: true });

EpisodeSchema.index({ seasonId: 1 });
EpisodeSchema.index({ seriesId: 1 });

const EpisodeModel = model<IEpisode>('Episode', EpisodeSchema);
export default EpisodeModel;
