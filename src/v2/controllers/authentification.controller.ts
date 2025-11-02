import { Request, Response } from "express";
import { AuthentificationService } from "../services/authentification.services";
import { userSchema } from "../middleware/validation.middleware";
import { z } from "zod";

export class AuthentificationController {
  public static async register(req: Request, res: Response): Promise<void> {
    try {
      const data = userSchema.parse(req.body);
      const user = await AuthentificationService.registerUser(
        data.email,
        data.nom,
        data.username,
        data.password
      );
      res.status(201).json(user);
    }   catch (error) {
            if (error instanceof z.ZodError) {
                res.status(400).json({ Message: error.issues.map(issue => issue.message) });
            }
            // erreur autre que zod
            console.error(error);
            res.status(500).json({ error: "Erreur serveur" }); 
        }
  }

  public static async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const result = await AuthentificationService.loginUser(email, password);
      res.status(200).json(result);
    } catch (error : any) {
      res.status(401).json({ message: error.message });
    }
  }
}
