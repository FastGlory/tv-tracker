import cors from "cors";
import rateLimit from "express-rate-limit";
import config from "config";
import { Express } from "express";


export const securisationServer = (app: Express) => {  
  const corsOrigins = config.get<string[]>("security.cors.origins");
  const rateLimitOptions = config.get<{ windowMs: number; max: number }>("security.rateLimit");
  // Je voulais faire une redirection ici mais inutile vu que je le fait dans le server
  const httpsConfig = config.get<{ redirectAllHttpToHttps: boolean }>("server.https");

  app.use(cors({
    origin: corsOrigins,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }));

  app.use(rateLimit({
    windowMs: rateLimitOptions.windowMs,
    max: rateLimitOptions.max,
    message: "Trop de requêtes, veuillez réessayer plus tard...",
  }));

  console.log(" SÉCURISÉ ! 🔐 ");
};

// https://www.npmjs.com/package/config


// attaque possible : (Générer par AI)
// for i in {1..120}; do curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/api/v2/movies; done
// seq 1 120 | xargs -n1 -P20 -I{} curl -s -o /dev/null -w "%{http_code}\n" -k https://localhost:3333/api/v2/movies
