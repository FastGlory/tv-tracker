import SeasonModel from "../models/season.models";
import SeriesModel from "../models/series.models";

export class SeasonService {
  public static async postSeasonWithSerieId(seriesId: string, data: { seasonNo: number; episodes?: number }) {
    const serie = await SeriesModel.findById(seriesId);
    if (!serie) {
      throw new Error("Série non trouvée pour ajout de saison");
    }
    const season = new SeasonModel({
      seriesId,              
      seasonNo: data.seasonNo,
      episodes: data.episodes ?? 0, // si pas d'épisodes, on met 0 et ensuite on va dans un autre endpoint ajouter les épisodes
    });

    await season.save();
    return season;
  }
}
