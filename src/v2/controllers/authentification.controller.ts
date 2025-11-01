import { Request, Response } from 'express';
import { AuthentificationService } from '../services/authentification.services';

export class AuthentificationController {
  static async register(req: Request, res: Response) {
    try {
      const { email, nom, username, password } = req.body;
      const user = await AuthentificationService.registerUser(email, nom, username, password);
      return res.status(201).json(user);
    } catch (e: any) {
      if (e.message.includes('utilisé')) return res.status(409).json({ message: e.message });
      return res.status(400).json({ message: e.message });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await AuthentificationService.loginUser(email, password);
      return res.status(200).json(result);
    } catch (e: any) {
      return res.status(401).json({ message: e.message });
    }
  }
}
