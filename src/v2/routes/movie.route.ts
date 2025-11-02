import { Router } from 'express';
import { MoviesController } from '../controllers/movie.controller';
import { authenticateToken } from '../middleware/authentification.middleware';
import {  authorizeRole } from '../middleware/role.middleware';

const router = Router();

router.get('/',authenticateToken, MoviesController.getMoviesWithFilters);
router.get('/:id',authenticateToken, MoviesController.getMovieById);
router.post('/', authenticateToken, authorizeRole('admin'), MoviesController.postMovie);
router.patch('/:id', authenticateToken, authorizeRole('admin'), MoviesController.patchMovie);
router.delete('/:id', authenticateToken, authorizeRole('admin'), MoviesController.deleteMovie);

export default router;
