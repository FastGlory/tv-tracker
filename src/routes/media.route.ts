import { MediaController } from "../controllers/media.controller";
import { Router} from "express";

const router = Router();

router.get('/media', MediaController.getAllMedia);
router.get('/media/:id', MediaController.getMediaById);
router.post('/media', MediaController.postMedia);
router.delete('/media/:id', MediaController.deleteMedia);
router.put('/media/:id', MediaController.updateMedia);



export default router;