import { MediaService } from "../services/media.service";
import { Request, Response } from "express";
import { mediaSchema  } from "../middleware/zod.middleware";
import {z} from "zod";

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

  public static async postMedia(req: Request, res: Response): Promise<void> {
    try {
      const media = mediaSchema.parse(req.body);
      const ajoutMedia = await MediaService.postMedia(media);
      res.status(200).json(ajoutMedia);
    } catch (error) {
      if (error instanceof z.ZodError) {
         res.status(400).json({ Message: error.issues.map(issue => issue.message) });
      }
      // erreur autre que zod
      console.error(error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  }
  public static async deleteMedia(req: Request, res: Response) : Promise<void> {
    try {
      const id = req.params.id;
      await MediaService.deleteMedia(id);
      res.status(200).json({ message: "Média supprimé" });
    } catch (error) {
      res.status(404).json({ error: "Média non trouvé" });
    }
  }
  
  public static async updateMedia(req: Request, res: Response) : Promise<void> { 
      try {
        const id = req.params.id;
        const verificationMedia = mediaSchema.parse(req.body);
        const modificationMedia = await MediaService.updateMedia(id,verificationMedia)
        res.status(200).json(modificationMedia)
      } catch (error) {
      if (error instanceof z.ZodError) {
         res.status(400).json({ Message: error.issues.map(issue => issue.message) });
      }
      // erreur autre que zod
      console.error(error);
      res.status(500).json({ error: "Erreur serveur" });
    }

  }

 public static async filterMedia(req: Request, res: Response): Promise<void> { 
    try {
        const type = req.query.type as string | undefined;
        const genre = req.query.genre as string | undefined;

        // J'ai résolue le problème avec l'indication erreur de vscode/ le 10 vient de https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/parseInt
        const year = req.query.year ? parseInt(req.query.year as string, 10) : undefined;

        const medias = await MediaService.getFilterMedia(type, genre, year);
        res.status(200).json(medias);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur serveur" });
    }
    }

}

// Source pour zod : https://blog.logrocket.com/schema-validation-typescript-zod/ et https://zod.dev/error-customization