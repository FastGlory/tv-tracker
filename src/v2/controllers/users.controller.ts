import { Response} from "express";
import { UsersService } from "../services/users.service";
import { IGetUserAuthInfoRequest } from "../middleware/authentification.middleware";

export class UsersController {
  static async getCurrentUser(req: IGetUserAuthInfoRequest, res: Response) {
    try {
      const user = await UsersService.getCurrentUser(req.user!.id);
      res.status(200).json(user);
    } catch (error: any) {
      res.status(404).json({ message: error.message } );
    }
  }

  static async patchCurrentUser(req: IGetUserAuthInfoRequest, res: Response) {
    try {
      const user = await UsersService.patchCurrentUser(req.user!.id, req.body);
      res.status(200).json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getUserById(req: IGetUserAuthInfoRequest, res: Response) {
    try {
      const user = await UsersService.getUserById(req.params.id);
      res.status(200).json(user);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }
}