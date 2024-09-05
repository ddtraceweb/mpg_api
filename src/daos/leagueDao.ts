import { collection } from '../config/db.js';
import { League } from '../models/league.js';
import { UserService } from '../services/userService.js';
import logger from '../utils/logger.js';

export class LeagueDao {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async getLeagueById(id: string): Promise<League | null> {
    try {
      const result = await collection.get(id);
      logger.info(`Successfully retrieved league with id: ${id}`);
      return result.content as League;
    } catch (error) {
      logger.error('Error getting league by id:', { error });
      return Promise.reject(error);
    }
  }

  async createLeague(league: League): Promise<void> {
    try {
      const adminExists = await this.userService.checkIfUserExists(
        league.adminId
      );
      if (!adminExists) {
        logger.error(
          `Cannot create league: Admin with id ${league.adminId} does not exist.`
        );
        throw new Error(`Admin with id ${league.adminId} does not exist.`);
      }

      await collection.upsert(league.id, league);
      logger.info(`League created with id: ${league.id}`);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
