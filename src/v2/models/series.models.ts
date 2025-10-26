import { Schema, model, Document } from 'mongoose';

export interface ISeries extends Document {
  title: string;
  genres: string[];
  status: 'ongoing' | 'ended';
}

const SeriesSchema = new Schema({
  title: { type: String, required: true, minlength: 1, maxlength: 200 },
  genres: [{ type: String, required: true, minlength: 1, maxlength: 30 }],
  status: { type: String, required: true, enum: ['ongoing', 'ended'] }
}, { timestamps: true });

SeriesSchema.index({ title: 1 });
SeriesSchema.index({ genres: 1 });

const SeriesModel = model<ISeries>('Series', SeriesSchema);
export default SeriesModel;
