import { Request, Response } from "express";
import { SeasonService } from "../services/season.service";
import { z } from "zod";
import { seasonSchema } from "../middleware/validation.middleware";

export class SeasonController {
  public static async postSeasonWithSerieId(req: Request, res: Response): Promise<void> {
    try {
      const { seriesId } = req.params;
      const data = seasonSchema.omit({ seriesId: true }).parse(req.body);

      const season = await SeasonService.postSeasonWithSerieId(seriesId, data);
      res.status(201).json(season);
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ Message: error.issues.map(issue => issue.message) });
        }
        // erreur autre que zod
         console.error(error);
         res.status(500).json({ error: "Erreur serveur" }); 
    }
    
  }
}
