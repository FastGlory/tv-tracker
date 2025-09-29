
import { Router} from "express";
import { SerieController } from "../controllers/serie.controller";

const router = Router();

router.get('/series/:id/episodes', SerieController.getAllEpisodesBySerieId);

export default router;