import { Router} from "express";
import { LogController } from "../controllers/log.controllers";

const router = Router();

router.get('/log', LogController.getLastLog);


export default router;