import { collection } from '../config/db.js';
import logger from '../utils/logger.js';

export class TeamDao {
  async updateTeamName(id: string, name: string): Promise<void> {
    try {
      const team = await collection.get(id);
      team.content.name = name;

      await collection.upsert(id, team.content);

      logger.info(`Team name updated successfully for team id: ${id}`);
    } catch (error) {
      logger.error('Error updating team name:', { error });
      return Promise.reject(error);
    }
  }
}
