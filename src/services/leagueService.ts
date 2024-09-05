import { LeagueDao } from '../daos/leagueDao.js';
import { League } from '../models/league.js';

const leagueDao = new LeagueDao();

export class LeagueService {
  async getUsersByLeague(
    leagueId: string
  ): Promise<{ users: { name: string }[] }> {
    const league = await leagueDao.getLeagueById(leagueId);
    if (league && league.usersTeams) {
      const users = Object.keys(league.usersTeams).map(userId => ({
        name: userId,
      }));
      return { users };
    }
    return { users: [] };
  }

  async createLeague(league: League): Promise<void> {
    return await leagueDao.createLeague(league);
  }
}
