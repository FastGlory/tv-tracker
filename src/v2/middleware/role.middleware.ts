import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';


const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';
export interface IGetUserAuthInfoRequest extends Request {
    user?: any;
}

export function authenticateToken(req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}

export function authorizeRole(role: 'admin' | 'user') {
  return (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) {
      return res.sendStatus(401);
    }

    if (user.role !== role) {
      return res.sendStatus(403);
    }

    next();
  };
}

//https://stackoverflow.com/questions/44383387/typescript-error-property-user-does-not-exist-on-type-request