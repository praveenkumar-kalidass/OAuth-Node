/**
 * Dao to fetch OAuth token
 *
 * @exports {Class} ClientService
 */
const ClientDao = require('../dao/Client');
const clientDao = new ClientDao();

/**
 * ClientService class
 */
class ClientService {
  /**
   * Method to get Client
   *
   * @param  {UUID} clientId
   * @param  {String} clientSecret
   * @param  {Function} getClientCB
   */
  getClient(clientId, clientSecret, getClientCB) {
    clientDao.findClientById(clientId, clientSecret, (clientErr, client) => {
      if (clientErr) {
        return getClientCB(clientErr);
      }
      return getClientCB(null, {
        id: client.id,
        grants: ['password', 'authorization_code', 'refresh_token'],
        redirectUris: [client.redirectUri]
      });
    });
  }
}

module.exports = ClientService;
