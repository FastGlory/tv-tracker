import { SeasonController } from "../controllers/season.controller";
import express from "express";
import { authenticateToken } from "../middleware/authentification.middleware";
import { authorizeRole } from "../middleware/role.middleware";
const router = express.Router();
router.post("/:seriesId/seasons", authenticateToken, authorizeRole("admin"), SeasonController.postSeasonWithSerieId);
export default router;