import  { Request, Response } from "express";
import { MoviesService } from "../services/movies.service";
import { movieSchema } from "../middleware/validation.middleware";
import { z } from "zod";
export class MoviesController {

    public static async postMovie(req: Request, res: Response): Promise<void> {
        try {
        const data = movieSchema.parse(req.body);
        const movie = await MoviesService.postMovie(data);
        res.status(201).json(movie);
        } catch (error) {
         if (error instanceof z.ZodError) {
             res.status(400).json({ Message: error.issues.map(issue => issue.message) });
         }
         // erreur autre que zod
          console.error(error);
          res.status(500).json({ error: "Erreur serveur" }); 
        }
    }

    public static async getMovieById(req: Request, res: Response) : Promise<void> {
        try {
            const movie = await MoviesService.getMovieById(req.params.id);
            res.status(200).json(movie);
        } catch (error: any) {
            res.status(404).json({ message: error.message });
        }
    }

     public static async patchMovie(req: Request, res: Response): Promise<void> {
        try {
            const data = movieSchema.partial().parse(req.body);
            const updated = await MoviesService.patchMovie(req.params.id, data);
            res.status(200).json(updated);
        }  catch (error) {
            if (error instanceof z.ZodError) {
                res.status(400).json({ Message: error.issues.map(issue => issue.message) });
            }
            // erreur autre que zod
            console.error(error);
            res.status(500).json({ error: "Erreur serveur" }); 
        }
    }
    public static async deleteMovie(req: Request, res: Response): Promise<void> {
        try {
            const deletedMovie = await MoviesService.deleteMovie(req.params.id);
            res.status(200).json(deletedMovie);
        } catch (error: any) {
            res.status(404).json({ message: error.message });
        }   
    }

    public static async getMoviesWithFilters(req: Request, res: Response): Promise<void> {
        try {
            const { title, genre, minYear, maxDur, page, limit } = req.query;

            const movies = await MoviesService.getMovieFilters(
                title as string | undefined,
                genre as string | undefined,
                minYear ? Number(minYear) : undefined,
                maxDur ? Number(maxDur) : undefined,
                Number(page),
                Number(limit)
            );

            res.status(200).json(movies);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}
