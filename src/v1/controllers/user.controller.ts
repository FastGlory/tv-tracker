import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export class UserController {
    public static async getAllUsersMediasFavorite(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            const medias = await UserService.getFavoriteByUserId(id);
            if (!medias) {
                res.status(404).json({ error: "Aucun média favori trouvé" });
                return;
            }
            res.status(200).json(medias);
        } catch (error) {
            res.status(500).json({ error: "Erreur serveur" });
        }
    }
}