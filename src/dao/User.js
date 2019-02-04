/**
 * Dao to fetch User data
 *
 * @exports {Class} UserDao
 */
const models = require('../models');
const passwordHash = require('password-hash');
const ServerError = require('oauth2-server/lib/errors/server-error');

/**
 * UserDao class
 */
class UserDao {
  /**
   * Method to find User object by email
   *
   * @param  {String} email
   * @param  {String} password
   * @param  {Function} getUserCB
   */
  getUserByCredentials(email, password, getUserCB) {
    models.User.find({
      where: {
        email: email
      }
    }).then((user) => {
      if (!user) {
        return getUserCB(new ServerError('User not found'));
      }
      // Validate password
      if (passwordHash.verify(password, user.password)) {
        return getUserCB(null, user);
      }
      return getUserCB(new ServerError('Invalid Credentials'));
    }, (getError) => {
      return getUserCB(getError);
    });
  }
}

module.exports = UserDao;
