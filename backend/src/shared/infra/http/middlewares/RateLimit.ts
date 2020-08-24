import { Request, Response, NextFunction } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import redis from 'redis';
import AppError from '@shared/errors/AppError';

const connection = redis.createClient({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASS || undefined,
});

const rateLimiter = new RateLimiterRedis({
  storeClient: connection,
  keyPrefix: 'middleware',
  points: 10,
  duration: 1,
});

export default async function RateLimiter(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    await rateLimiter.consume(req.ip);
    return next();
  } catch (err) {
    throw new AppError('Requests limit exceeded for current IP', 429);
  }
}
