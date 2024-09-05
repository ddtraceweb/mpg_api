import { UserDao } from '../daos/userDao.js';

const userDao = new UserDao();

export class UserService {
  async checkIfUserExists(id: string): Promise<boolean> {
    const user = await userDao.getUserById(id);
    return user !== null;
  }
}
