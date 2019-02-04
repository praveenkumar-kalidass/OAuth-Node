const express = require('express');
const OAuthServer = require('oauth2-server');
const OAuthService = require('../service/OAuthServer');
const oAuthService = new OAuthService();
const router = express.Router();

/**
 * OAuth2.0 Server
 */
const oAuth = new OAuthServer({
  model: oAuthService,
  allowEmptyState: true
});

/**
 * @swagger
 * /api/auth/login:
 *  post:
 *    summary: Login to pass Authentication
 *    description: Login to pass Authentication
 *    tags:
 *      - Auth
 *    requestBody:
 *      required: true
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *              password:
 *                type: string
 *              client_id:
 *                type: uuid
 *              client_secret:
 *                type: string
 *              grant_type:
 *                default: password
 *              response_type:
 *                default: code
 *            required:
 *              - username
 *              - password
 *              - client_id
 *              - client_secret
 *              - grant_type
 *              - response_type
 *    responses:
 *      200:
 *        description: Authentication success
 *      401:
 *        description: Authentication failed
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
 * @swagger
 * /api/auth/authenticate:
 *  post:
 *    summary: Authenticate Refresh token
 *    description: Regenerate Access token using Refresh token
 *    tags:
 *      - Auth
 *    parameters:
 *      - name: code
 *        in: query
 *        schema:
 *          type: string
 *          description: Authentication code
 *    responses:
 *      200:
 *        description: Authentication success
 *      401:
 *        description: Authentication failed
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
