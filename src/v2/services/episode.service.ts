import EpisodeModel from "../models/episode.models";
import SeriesModel from "../models/series.models";
import SeasonModel from "../models/season.models";

export class EpisodeService {
  public static async postEpisodeWithSeasonId(seriesId: string,seasonId: string,data: { epNo: number; title: string; durationMin?: number }) {
    const serie = await SeriesModel.findById(seriesId);
    if (!serie) {
      throw new Error("Série introuvable pour ajout d'épisode");
    }
    const season = await SeasonModel.findOne({ _id: seasonId, seriesId });
    if (!season) {
      throw new Error("Saison introuvable pour ajout d'épisode");
    }

    const episode = new EpisodeModel({
      seriesId,
      seasonId,
      epNo: data.epNo,
      title: data.title,
      durationMin: data.durationMin ?? 0,
    });

    await episode.save();
    return episode;
  }

  public static async getEpisodeByMinDuration(seriesId: string,seasonId: string, minDuration: number) {
    const serie = await SeriesModel.findById(seriesId);
      if (!serie) {
        throw new Error("Série introuvable pour récupération d'épisodes");
      }
    const season = await SeasonModel.findOne({ _id: seasonId, seriesId });
      if (!season) {
        throw new Error("Saison introuvable pour récupération d'épisodes");
      }
    const episodes = await EpisodeModel.find({seriesId,seasonId,durationMin: { $gte: minDuration },});
    return episodes;
    }
}
