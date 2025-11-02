import { RatingsController } from "../controllers/rating.controller";
import express from "express";
import { authenticateToken } from "../middleware/authentification.middleware";
const router = express.Router();
router.post("/", authenticateToken, RatingsController.postRating);
router.get("/avg/movie/:movieId", authenticateToken, RatingsController.getAverageMovieRating);
router.get("/avg/series/:seriesId", authenticateToken, RatingsController.getAverageSeriesRating);
export default router;