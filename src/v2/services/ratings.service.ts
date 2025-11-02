import RatingModel from "../models/rating.models";
import SeriesModel from "../models/series.models";
import SeasonModel from "../models/season.models";
import EpisodeModel from "../models/episode.models";
import MovieModel from "../models/movie.models";
import mongoose from "mongoose";

export class RatingsService {

 public static async postRating(data: {userId: string;target: "movie" | "episode";targetId: string;score: number;review?: string;}) {
    const targetExistsInCollection = data.target === "movie"
      ? await MovieModel.exists({ _id: data.targetId })
      : await EpisodeModel.exists({ _id: data.targetId });

    if (!targetExistsInCollection) {
      throw new Error(`${data.target} le target n'est pas trouvé dans l'une des 2 collections.`);
    }
    const ratingAlreadyExists = await RatingModel.findOne({
      userId: data.userId,
      target: data.target,
      targetId: data.targetId,
    });


    // ici j'ai remarqué que je peux direct faire avec create sans instantier un model avant et donc d'utiliser .saver()
    if (!ratingAlreadyExists) {
      const newRating = await RatingModel.create({
        userId: data.userId,
        target: data.target,
        targetId: data.targetId,
        score: data.score,
        review: data.review,
      });
      return newRating;
    } else {
      ratingAlreadyExists.score = data.score;
      ratingAlreadyExists.review = data.review;
      const newVersionRating = await ratingAlreadyExists.save();
      return newVersionRating;
    }
  }

  public static async getAvarageRatingMovie(movieId: string) {
    const ratings = await RatingModel.aggregate([
      { $match: { target: "movie", targetId: new mongoose.Types.ObjectId(movieId) } },
      { $group: { _id: "$targetId", averageScore: { $avg: "$score" } , count: { $sum: 1 } } },
    ]);
    if (ratings.length === 0) {
      return null;
    }
    return ratings[0].averageScore;
  }

 public static async getAverageRatingSeries(seriesId: string) {
    const series = await SeriesModel.findById(seriesId);
    if (!series) {
      throw new Error("Série introuvable pour calcul de la note moyenne");
    }
    const episodes = await EpisodeModel.find({ seriesId: series._id }).select("_id");
    if (!episodes.length) {
      return null; 
    }

    const allEpisodeIds = episodes.map(ep => ep._id);
    const ratings = await RatingModel.aggregate([
        { $match: { target: "episode", targetId: { $in: allEpisodeIds } } },
        { $group: { _id: null, averageScore: { $avg: "$score" }, count: { $sum: 1 } } }
    ]);

    if (ratings.length === 0) return { averageScore: 0, count: 0 };
    return ratings[0].averageScore;
    }


}

// https://www.mongodb.com/docs/manual/core/document/
