import express from "express";
import { SeriesController } from "../controllers/serie.controllers";
import { authenticateToken } from "../middleware/authentification.middleware";
import { authorizeRole } from "../middleware/role.middleware";
const router = express.Router();
router.post("/", authenticateToken, authorizeRole("admin"), SeriesController.postSerie);
router.get("/", authenticateToken, SeriesController.getSerieFiltered);
export default router;