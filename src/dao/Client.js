/**
 * Dao to fetch Client data
 *
 * @exports {Class} ClientDao
 */
const models = require('../models');
const passwordHash = require('password-hash');
const ServerError = require('oauth2-server/lib/errors/server-error');

/**
 * ClientDao class
 */
class ClientDao {
  /**
   * Method to get client by id
   *
   * @param  {UUID} clientId
   * @param  {String} clientSecret
   * @param  {Function} findCB
   */
  findClientById(clientId, clientSecret, findCB) {
    models.Client.find({
      where: {
        id: clientId
      }
    }).then((client) => {
      if (!client) {
        return findCB(new ServerError('No Client found'));
      }
      if (clientSecret) {
        if (passwordHash.verify(clientSecret, client.clientSecret)) {
          return findCB(null, client);
        }
        return findCB(new ServerError('Client Secret does not match'));
      }
      return findCB(null, client);
    }, (getError) => {
      return findCB(getError);
    });
  }
}

module.exports = ClientDao;
