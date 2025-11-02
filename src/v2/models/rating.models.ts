import { Schema, model, Document } from 'mongoose';
import sanitizeHtml from 'sanitize-html';
export interface IRating extends Document {
  userId: Schema.Types.ObjectId;
  target: 'movie' | 'episode';
  targetId: Schema.Types.ObjectId;
  score: number;
  review?: string;
}

const RatingSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  target: { type: String, enum: ['movie', 'episode'], required: true },
  targetId: { type: Schema.Types.ObjectId, required: true }, 
  score: { type: Number, required: true, min: 0, max: 10 },
  review: { type: String, maxlength: 2000 }
}, { timestamps: true });


RatingSchema.pre<IRating>("save", function (next) {
  if (this.review) {
    this.review = sanitizeHtml(this.review, {
      allowedTags: [],          
      allowedAttributes: {},
    });
  }
  next();
});
RatingSchema.index({ targetId: 1 });

const RatingModel = model<IRating>('Rating', RatingSchema);
export default RatingModel;


// https://www.npmjs.com/package/sanitize-html
// https://mongoosejs.com/docs/middleware.html