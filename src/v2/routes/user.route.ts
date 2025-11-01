import express from "express";
import { UsersController } from "../controllers/users.controller";
import { authenticateToken, } from "../middleware/authentification.middleware";
import { authorizeRole } from "../middleware/role.middleware";

const router = express.Router();


router.get("/me", authenticateToken, UsersController.getCurrentUser);
router.patch("/me", authenticateToken, UsersController.patchCurrentUser);
router.get("/:id", authenticateToken, authorizeRole("admin"), UsersController.getUserById);

export default router;
