/**
 * Dao to fetch OAuth token
 *
 * @exports {Class} OAuthTokenService
 */
const OAuthTokenDao = require('../dao/OAuthToken');
const oAuthTokenDao = new OAuthTokenDao();

/**
 * OAuthTokenService class
 */
class OAuthTokenService {
  /**
   * Method to get AccessToken
   *
   * @param  {String} bearerToken
   * @param  {Function} getTokenCB
   */
  getAccessToken(bearerToken, getTokenCB) {
    oAuthTokenDao.findAccessToken(bearerToken, (accessTokenErr, token) => {
      if (accessTokenErr) {
        return getTokenCB(accessTokenErr);
      }
      return getTokenCB(null, {
        accessToken: token.accessToken,
        accessTokenExpiresAt: token.accessTokenExpiresAt,
        client: {
          id: token.clientId
        },
        user: {
          id: token.userId
        }
      });
    });
  }
  /**
   * Service to find Refresh token
   *
   * @param  {String} bearerToken
   * @param  {Function} getTokenCB
   */
  getRefreshToken(bearerToken, getTokenCB) {
    oAuthTokenDao.findRefreshToken(bearerToken, (refreshTokenErr, token) => {
      if (refreshTokenErr) {
        return getTokenCB(refreshTokenErr);
      }
      return getTokenCB(null, {
        refreshToken: token.refreshToken,
        refreshTokenExpiresAt: token.refreshTokenExpiresAt,
        client: {
          id: token.clientId
        },
        user: {
          id: token.userId
        }
      });
    });
  }
  /**
   * Service to save access token
   *
   * @param  {String} token
   * @param  {Object} client
   * @param  {Object} user
   * @param  {Function} saveTokenCB
   */
  saveToken(token, client, user, saveTokenCB) {
    token.clientId = client.id;
    token.userId = user.id;
    oAuthTokenDao.saveAccessToken(token, (saveErr, saveToken) => {
      if (saveErr) {
        return saveTokenCB(saveErr);
      }
      saveToken.client = client;
      saveToken.user = user;
      return saveTokenCB(null, saveToken);
    });
  }
  /**
   * Method to revoke token from OAuth
   *
   * @param  {Object} token
   * @param  {Function} revokeCB
   */
  revokeToken(token, revokeCB) {
    oAuthTokenDao.deleteAccessToken(token, (deleteErr, isDeleted) => {
      if (deleteErr) {
        return revokeCB(deleteErr);
      }
      return revokeCB(null, isDeleted);
    });
  }
}

module.exports = OAuthTokenService;
