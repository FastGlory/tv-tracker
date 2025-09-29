import { Request, Response } from "express";
import { SerieService }from "../services/serie.service";

export class SerieController {
    public static async getAllEpisodesBySerieId(req: Request, res: Response) : Promise<void> {
        try {
            const id = req.params.id;
            const serie = await SerieService.getAllEpisodesBySerieId(id);
            if (!serie) {
                res.status(404).json({ error: "Série non trouvée" });
                return;
            }
            res.status(200).json(serie);
        } catch (error) {
            res.status(500).json({ error: "Erreur serveur" });
        }
    }
}