import express from 'express';
import { EpisodeController } from '../controllers/episode.controller';
import { authenticateToken } from '../middleware/authentification.middleware';
import { authorizeRole } from '../middleware/role.middleware';
const router = express.Router();
router.post('/:seriesId/seasons/:seasonId/episodes', authenticateToken, authorizeRole('admin'), EpisodeController.postEpisode);
router.get('/:seriesId/seasons/:seasonId/episodes', authenticateToken, EpisodeController.getEpisodesByMinDuration);
export default router;