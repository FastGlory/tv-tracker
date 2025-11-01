import express from "express";
import { AuthentificationController } from "../controllers/authentification.controller";

const router = express.Router();

router.post("/register", AuthentificationController.register);
router.post("/login", AuthentificationController.login);

export default router;
