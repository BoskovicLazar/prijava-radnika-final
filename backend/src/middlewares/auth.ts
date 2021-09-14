import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export default (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    res.status(401);
    res.json({
      error: 'Not authorized',
    });
    return;
  }

  const secret = process.env.ACCESS_TOKEN_SECRET as string;
  jwt.verify(token, secret, (err, user) => {
    if (err) {
      res.status(401);
      res.json({
        error: 'Not authorized',
      });
      return;
    }

    req.user = user;
    next();
  });
}
