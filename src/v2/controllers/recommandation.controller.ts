import { Request, Response } from "express";
import { RecommandationService } from "../services/recommandation.service";

export class RecommandationController {
  public static async getSimilarMoviesTime(req: Request, res: Response): Promise<void> {
    try {
      const { movieId } = req.params;
      const limit = parseInt(req.query.limit as string) || 5;

      const similarMoviesTime = await RecommandationService.getSimilarMoviesTime(movieId, limit);

      if (!similarMoviesTime.length) {
        res.status(404).json({ message: "Aucun film similaire trouvé " });
        return;
      }

      res.status(200).json({
        message: `Voici les ${limit} films similaires à celui demandé en termes de durée :`,
        results: similarMoviesTime,
      });
    } catch (error) {
      res.status(400).json({
        message: (error as Error).message || "Erreur lors de la récupération des recommandations",
      });
    }
  }
}
