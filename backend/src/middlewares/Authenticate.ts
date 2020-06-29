import { Request, NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import AuthConfig from '../config/auth';
import AppError from '../errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function authenticate(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError(
      'Authorization token required to access this resource',
      401,
    );
  }

  const [, token] = authHeader.split(' '); // informando ao JS que a primeira posição do array não vai ser utilizada

  try {
    const decoded = verify(token, AuthConfig.secret);
    const { sub } = decoded as TokenPayload;

    req.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT Token', 401);
  }
}
