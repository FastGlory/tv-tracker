import { Request, Response } from "express";
import { SerieService } from "../services/serie.service";
import { Episode } from "../models/episode.model";
import { Season } from "../models/season.model";

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
    public static async addSeason(req : Request , res :Response):  Promise<void>{ 
        try {
            const id = req.params.id;
            const nouvelleSaison = new Season(req.body.seasonNumber,new Date(req.body.releaseDate),[]);
            const ajoutSaison = await SerieService.addSeason(id,nouvelleSaison)
            res.status(200).json(ajoutSaison);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erreur serveur" });
        }
    }

    public static async addEpisode(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            const seasonNumber = req.body.seasonNumber;
            const nouvelleEpisode = new Episode(req.body.id,req.body.title,req.body.duration,req.body.episodeNumber,req.body.watched);
            const ajoutEpisode = await SerieService.addEpisode(id, seasonNumber, nouvelleEpisode);
            res.status(201).json(ajoutEpisode);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erreur serveur" });
        }
    }

    public static async patchEpisodeWatch(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.serieId;
            const seasonNumber = Number(req.params.seasonNumber);
            const episodeId = req.params.episodeId;

            const episodeModifie = await SerieService.patchEpisodeWatch(id, seasonNumber, episodeId);
            res.status(200).json({message: "Félicitation vous venez de terminer le visionnement de votre épisode ! ",episodeModifie});
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erreur serveur" });
        }
    }



}