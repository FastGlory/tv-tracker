import { LogService } from "../services/log.service";
import { Request, Response } from "express";
export class LogController {

    public static async getLastLog(req: Request, res: Response) : Promise<void> {
      try {
          const lastLigneLog = await LogService.getLastLog();
          res.status(200).json(lastLigneLog);
      } catch (error) {
          res.status(500).json({ error: "Erreur serveur" });
      }
    }
    
}