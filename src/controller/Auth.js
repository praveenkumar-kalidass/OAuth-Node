/**
 * Controller to route all routes with index "/api/auth"
 *
 * @exports {express} router
 */
const express = require('express');
const OAuthServer = require('oauth2-server');
const OAuthService = require('../service/OAuthServer');
const oAuthService = new OAuthService();
const router = express.Router();

/**
 * OAuth2.0 Server
 *
 */
const oAuth = new OAuthServer({
  model: oAuthService,
  allowEmptyState: true
});

/**
 * Controller to route "/api/auth/login"
 *
 * @header {String} Content-Type ["application/x-www-form-urlencoded"]
 * @body   {String} username
 * @body   {String} password
 * @body   {UUID} client_id
 * @body   {String} response_type ["code"]
 * @body   {String} grant_type ["password"]
 * @type   {POST}
 */
router.post('/login', (request, response) => {
  let Request = new OAuthServer.Request(request);
  let Response = new OAuthServer.Response(request);
  oAuth.authorize(
    Request, Response,
    {
      authenticateHandler: {
        handle: (request, response, handleCB) => {
          oAuthService.getUser(request.body.username, request.body.password,
            (authErr, user) => {
              if (authErr) {
                return handleCB(authErr);
              }
              return handleCB(null, user);
            });
        }
      }
    },
    (authErr) => {
      if (authErr) {
        response.status(401).send(authErr);
      } else {
        response.set(Response.headers);
        response.redirect(307, Response.headers.location);
      }
    }
  );
});

/**
 * Redirect - Controller to route "/api/auth/authenticate"
 *
 * @query {String} code [Authentication code]
 * @type  {POST}
 */
router.post('/authenticate', (request, response) => {
  let Request = new OAuthServer.Request(request);
  let Response = new OAuthServer.Response(request);
  oAuth.token(
    Request, Response, {},
    (tokenErr, token) => {
      if (tokenErr) {
        response.status(401).send(tokenErr);
      } else {
        response.status(200).send(token);
      }
    }
  );
});

module.exports = router;
