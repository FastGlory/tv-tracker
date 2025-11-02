import { Request, Response } from "express";
import { EpisodeService } from "../services/episode.service";
import { z } from "zod";
import { episodeSchema } from "../middleware/validation.middleware";

export class EpisodeController {
  public static async postEpisode(req: Request, res: Response): Promise<void> {
    try {
      const { seriesId, seasonId } = req.params;
      const data = episodeSchema.parse(req.body);
      const episode = await EpisodeService.postEpisodeWithSeasonId(
        seriesId,
        seasonId,
        data
      );

      res.status(201).json(episode);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          message: "Erreur de validation",
          details: error.issues,
        });
      } else {
        res.status(400).json({ message: (error as Error).message });
      }
    }
  }
  public static async getEpisodesByMinDuration(req: Request, res: Response): Promise<void> {
    try {
      const { seriesId, seasonId } = req.params;
      const minDuration = Number(req.query.minDuration) || 0;

      if (minDuration < 0)
         res.status(400).json({ message: "Durée minimale invalide" });

      const episodes = await EpisodeService.getEpisodeByMinDuration( seriesId,seasonId,minDuration);

      res.status(200).json(episodes);
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur" });
    }
  }

}