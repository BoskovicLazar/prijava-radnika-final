import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import db from '../models';

export async function login(req: Request, res: Response) {
  const username = req.body.username;
  const password = req.body.password;

  const admin = await db.Admin.findOne({
    where: {
      username: username,
    },
  });

  if (admin === null || admin.password !== password) {
    res.status(403);
    res.json({
      error: 'Wrong username or password',
    });

    return;
  }

  const user = {
    id: admin.id,
    username: admin.username,
    password: admin.password,
    firstName: admin.firstName,
    secondName: admin.secondName,
  }

  const secret = process.env.ACCESS_TOKEN_SECRET as string;
  const token = jwt.sign(user, secret);

  res.json({
    token: token,
  });
}
