import { Schema, model, Document } from 'mongoose';

export interface ISeason extends Document {
  seriesId: Schema.Types.ObjectId;
  seasonNo: number;
  episodes: number;
}

const SeasonSchema = new Schema({
  seriesId: { type: Schema.Types.ObjectId, ref: 'Series', required: true },
  seasonNo: { type: Number, required: true, min: 1 },
  episodes: { type: Number, required: true, min: 0 }
}, { timestamps: true });

SeasonSchema.index({ seriesId: 1 });

const SeasonModel = model<ISeason>('Season', SeasonSchema);
export default SeasonModel;
