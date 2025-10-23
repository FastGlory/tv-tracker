import { Request, Response, NextFunction } from 'express';


// Le code vient du cours d'interprétation de donnée mais adapté à mon code pour pouvoir exporter les middlewares différent

const winston = require('winston');
const logger = winston.createLogger({
    // niveau minimum d'erreur
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'src/logs/app.log' })
    ]
  });
  

export function middlewareLogger(req: Request, res: Response, next: NextFunction) {
    logger.info(`${req.method} ${req.url}`);
    next();
  }

export function middlewareError(err: Error, req: Request, res: Response, next: NextFunction) {
    logger.error(err.stack || err.message);
    res.status(500).send('Une erreur est survenue!');
}

  
export default logger;