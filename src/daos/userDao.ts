import { collection } from '../config/db.js';
import { User } from '../models/user.js';
import logger from '../utils/logger.js';

export class UserDao {
  async getUserById(id: string): Promise<User | null> {
    try {
      const result = await collection.get(id);
      logger.info(`Successfully retrieved user with id: ${id}`);
      return result.content as User;
    } catch (error) {
      logger.error(`Error getting user by id ${id}:`, { error });
      return Promise.reject(error);
    }
  }
}
