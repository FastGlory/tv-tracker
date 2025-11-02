import { Request, Response } from "express";
import {serieService } from "../services/serie.service";
import { seriesSchema } from "../middleware/validation.middleware";
import { z } from "zod";



export class SeriesController {
    public static async postSerie(req: Request, res: Response): Promise<void> {
        try {
            const data = seriesSchema.parse(req.body);
            const serie = await serieService.postSerie(data);
            res.status(201).json(serie);
        } catch (error) {
            if (error instanceof z.ZodError) {
                res.status(400).json({ Message: error.issues.map(issue => issue.message) });
            }
            // erreur autre que zod
            console.error(error);
            res.status(500).json({ error: "Erreur serveur" });
        }
    } 
    public static async getSerieFiltered(req: Request, res: Response): Promise<void> {
        try {
            const { genre, title, status } = req.query;
            const series = await serieService.getSerieFiltered(
                genre as string | undefined,
                title as string | undefined,
                status as string | undefined
            );
            res.status(200).json(series);
        } catch (error: any) {
            res.status(404).json({ message: error.message });
        }
    }
}