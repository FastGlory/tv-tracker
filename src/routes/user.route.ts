import { UserController } from "../controllers/user.controller";
import { Router} from "express";

const router = Router();

router.get('/users/:id/favorites', UserController.getAllUsersMediasFavorite);

export default router;
