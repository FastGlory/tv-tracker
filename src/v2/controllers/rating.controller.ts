import { Request, Response } from "express";
import { z } from "zod";
import { ratingSchema } from "../middleware/validation.middleware"; 
import { RatingsService } from "../services/ratings.service";


export class RatingsController {
  public static async postRating(req: Request, res: Response): Promise<void> {
    try {
      const data = ratingSchema.parse(req.body);
      const rating = await RatingsService.postRating(data);

      res.status(201).json(rating);
    }catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ Message: error.issues.map(issue => issue.message) });
        }
         console.error(error);
         res.status(500).json({ error: "Erreur serveur" }); 
    }
  }
  public static async getAverageMovieRating(req: Request, res: Response): Promise<void> {
    try {
      const { movieId } = req.params;

      const moyenne = await RatingsService.getAvarageRatingMovie(movieId);
      if (moyenne === null) {
        res.status(404).json({ message: "Aucune note trouvée pour ce film" });
        return;
      }
      res.status(200).json(moyenne);
    }  catch (error: any) {
        res.status(500).json({ message: error.message });
    }
  }

  public static async getAverageSeriesRating(req: Request, res: Response): Promise<void> {
    try {
      const { seriesId } = req.params;
      const moyenne = await RatingsService.getAverageRatingSeries(seriesId);
      if (!moyenne) {
        res.status(404).json({ message: "Aucune note trouvée pour cette série" });
        return;
      }

      res.status(200).json(moyenne);
    }catch (error: any) {
        res.status(500).json({ message: error.message });
    }
  }
}
