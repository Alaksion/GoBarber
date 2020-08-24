import redis, { Redis as RedisClient } from 'ioredis';
import CacheConfig from '@config/cache';
import ICacheProvider from '../models/ICacheProvider';

export default class RedisCacheProvider implements ICacheProvider {
  private client: RedisClient;

  constructor() {
    this.client = new redis(CacheConfig.config.redis);
  }

  public async save(key: string, value: any): Promise<void> {
    this.client.set(key, JSON.stringify(value));
    return;
  }

  public async recover<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);

    if (!data) {
      return null;
    }

    const parsedData = JSON.parse(data) as T;

    return parsedData;
  }

  public async invalidate(key: string): Promise<void> {
    await this.client.del(key);
  }

  public async invalidatePrefix(prefix: string): Promise<void> {
    const keys = await this.client.keys(`${prefix}:*`);

    const pipe = this.client.pipeline();

    keys.forEach(key => {
      pipe.del(key);
    });

    await pipe.exec();
    return;
  }
}
