/**
 * Index Controller to get all routes with index "/api"
 *
 * @exports {express} router
 */
const express = require('express');
const OAuthServer = require('oauth2-server');
const authController = require('./Auth');
const userController = require('./User');
const OAuthService = require('../service/OAuthServer');
const oAuthService = new OAuthService();
const router = express.Router();

/**
 * @swagger
 * components:
 *  securitySchemes:
 *    bearerAuth:
 *      type: http
 *      scheme: bearer
 */
const oAuth = new OAuthServer({
  model: oAuthService,
  allowEmptyState: true,
  requireClientAuthentication: {
    password: false
  }
});

/**
 * Middleware - "/api/auth/*"
 *
 * @param {String} route
 * @param {Class} authController
 */
router.use('/auth', authController);

/**
 * Router Middleware
 *  - Authentication of OAuth access token
 */
router.use((request, response, next) => {
  let Request = new OAuthServer.Request(request);
  let Response = new OAuthServer.Response(request);
  oAuth.authenticate(
    Request, Response, {},
    (authErr) => {
      if (authErr) {
        response.status(401).send(authErr);
      } else {
        next();
      }
    }
  );
});

/**
 * Middleware - "/api/user/*"
 *
 * @param {String} route
 * @param {Class} userController
 */
router.use('/user', userController);

module.exports = router;
