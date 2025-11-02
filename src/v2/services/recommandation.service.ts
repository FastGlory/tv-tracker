import RatingModel from '../models/rating.models';
import MovieModel from '../models/movie.models';
import { RatingsService } from './ratings.service';
export class RecommandationService {
    public static async getSimilarMoviesTime(movieId: string, limit : number ) {
    const movie = await MovieModel.findById(movieId);
    if (!movie) throw new Error("Film introuvable");

    const minDur = movie.durationMin - 15;
    const maxDur = movie.durationMin + 15;

    return await MovieModel.find({_id: { $ne: movieId },durationMin: { $gte: minDur, $lte: maxDur }, }).limit(limit).select("title durationMin genres");
    }


}