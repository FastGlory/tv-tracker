import {z} from "zod";
import { MediaService } from "../services/media.service";
import { Request, Response } from "express";


// DiscrimnatedUnion est la parce qu'on a deux model avec un format json bien différents
// Par conséquend on doit les différencier pour pouvoir les valider normalement
// Source : https://timkapitein.nl/blog/parsing-discriminated-unions-with-zod



// NOTE POUR MOI : possiblité de changement pour integré la fonctionnalité regex sur certain aspect. Déjà fait pour la date de sortie d'une saison
// À CHANGER ICI
const mediaSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("Film"),
    id: z.string(),
    title: z.string(),
    genre: z.string(),
    plateform: z.string(),
    year: z.number().int().max(2025),
    rating: z.number().min(0).max(10),
    duration: z.number().int().positive(),
    watched: z.boolean()
  }),
  z.object({ 
    type: z.literal("Serie"),
    id: z.string(),
    title: z.string(),
    genre: z.string(),
    plateform: z.string(),
    year: z.number().int().max(2025),
    rating: z.number().min(0).max(10),
    status: z.enum(["En cours", "Terminée"]),
    seasons: z.array(
      z.object({
        seasonNumber: z.number().int().positive(),
        releaseDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date doit être au format YYYY-MM-DD"),
        episodes: z.array(
          z.object({
            id: z.string(),
            title: z.string(),
            duration: z.number().int().positive(),
            watched: z.boolean(),
            episodeNumber: z.number().int().positive()
          })
        )
      })
    )
  })
]);


export class MediaController {
  public static async getAllMedia(req: Request, res: Response) : Promise<void>{
    try {
      const medias = await MediaService.getAllMedia();
      res.status(200).json(medias);
    } catch (error) {
      res.status(500).json({ error: "Erreur serveur" });
    }
  }

  public static async getMediaById(req: Request, res: Response) : Promise<void> {
    try {
      const id = req.params.id;
      const media = await MediaService.getMediaById(id);
      if (!media) {
        res.status(404).json({ error: "Média non trouvé" });
      }
      res.status(200).json(media);
    } catch (error) {
      res.status(500).json({ error: "Erreur serveur" });
    }
  }


  // La majorité du code vient du cours et celui de la source en bas
  // J'ai juste adapté pour que ca colle avec mon service et mon schéma zod


  public static async postMedia(req: Request, res: Response) : Promise<void> {
    try {
      const verificationMedia = mediaSchema.safeParse(req.body);
      const result = await MediaService.postMedia(verificationMedia.data);
      res.json(result);

    } catch (error) {
    if (error instanceof z.ZodError) {
      for (const issue of error.issues) {
        console.error("Validation failed: ", issue.message);
      }
    } else {
      console.error("Erreur inattendue: ", error);
    }
  }
}
  public static async deleteMedia(req: Request, res: Response) : Promise<void> {
    try {
      const id = req.params.id;
      await MediaService.deleteMedia(id);
      res.status(200).json({ message: "Média supprimé" });
    } catch (error) {
      res.status(500).json({ error: "Erreur serveur" });
    }
  }
  
  //public static async updateMedia(req: Request, res: Response) : Promise<void> { }

}

// Source pour zod : https://blog.logrocket.com/schema-validation-typescript-zod/