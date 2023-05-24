import { usersModel } from '../../models/users.model.js';

export default class UsersManager {
  async getUserByEmail(email) {
    try {
      const user = await usersModel.findOne({ email });
      return user;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async getUserById(id) {
    try {
      const user = await usersModel.findById(id);
      return user;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}
