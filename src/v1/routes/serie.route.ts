
import { Router} from "express";
import { SerieController } from "../controllers/serie.controller";

const router = Router();


router.get('/series/:id/episodes', SerieController.getAllEpisodesBySerieId);
router.post('/series/:id/seasons', SerieController.addSeason);
router.post('/series/:id/episodes', SerieController.addEpisode);
router.patch('/series/:serieId/seasons/:seasonNumber/episodes/:episodeId', SerieController.patchEpisodeWatch);
export default router;