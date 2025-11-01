import { Request, Response, NextFunction } from 'express';

export interface IGetUserAuthInfoRequest extends Request {
    user?: any;
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