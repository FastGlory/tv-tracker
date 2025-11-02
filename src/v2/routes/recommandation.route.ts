import { RecommandationController } from "../controllers/recommandation.controller";
import express from "express";
import { authenticateToken } from "../middleware/authentification.middleware";
const router = express.Router();
router.get("/movies/similar/:movieId", authenticateToken, RecommandationController.getSimilarMoviesTime);
export default router;