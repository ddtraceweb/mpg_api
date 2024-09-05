import { TeamDao } from '../daos/teamDao.js';

const teamDao = new TeamDao();

export class TeamService {
  async updateTeamName(teamId: string, name: string): Promise<void> {
    await teamDao.updateTeamName(teamId, name);
  }
}
