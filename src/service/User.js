/**
 * Dao to fetch OAuth token
 *
 * @exports {Class} UserService
 */
const UserDao = require('../dao/User');
const userDao = new UserDao();

/**
 * UserService class
 */
class UserService {
  /**
   * Method to get User
   *
   * @param  {String} email
   * @param  {String} password
   * @param  {Function} getUserCB
   */
  getUser(email, password, getUserCB) {
    userDao.getUserByCredentials(email, password, (getErr, user) => {
      if (getErr) {
        return getUserCB(getErr);
      }
      return getUserCB(null, user);
    });
  }
  /**
   * Method to get User by ID
   *
   * @param  {UUID} userId
   * @param  {Function} getUserCB
   */
  getUserById(userId, getUserCB) {
    userDao.findUserById(userId, (findErr, user) => {
      if (findErr) {
        return getUserCB(findErr);
      }
      return getUserCB(null, user);
    });
  }
}

module.exports = UserService;
