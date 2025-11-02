import { Response } from "express";
import { UsersService } from "../services/users.service";
import { IGetUserAuthInfoRequest } from "../middleware/authentification.middleware";
import { userSchema } from "../middleware/validation.middleware";
import { z } from "zod";

export class UsersController {
  public static async getCurrentUser(req: IGetUserAuthInfoRequest, res: Response) : Promise<void> {
    try {
      const user = await UsersService.getCurrentUser(req.user!.id);
      res.status(200).json(user);
    } catch (error: any) {
      res.status(404).json({ message: error.message } );
    }
  }

 public static async patchCurrentUser(req: IGetUserAuthInfoRequest, res: Response): Promise<void> {
    try {
      const data = userSchema.partial().parse(req.body);
      const user = await UsersService.patchCurrentUser(req.user!.id, data);
      res.status(200).json(user);
    }   catch (error) {
            if (error instanceof z.ZodError) {
                res.status(400).json({ Message: error.issues.map(issue => issue.message) });
            }
            // erreur autre que zod
            console.error(error);
            res.status(500).json({ error: "Erreur serveur" }); 
        }
  }

  public static async getUserById(req: IGetUserAuthInfoRequest, res: Response) : Promise<void> {
    try {
      const user = await UsersService.getUserById(req.params.id);
      res.status(200).json(user);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }
}